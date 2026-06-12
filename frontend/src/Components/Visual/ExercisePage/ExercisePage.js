export default class ExercisePage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.plan = null;
    this.selectedDay = null;

    this.querySelector('#back-to-dashboard')?.addEventListener('click', () => slice.router.navigate('/dashboard'));
    this.querySelector('#demo-close')?.addEventListener('click', () => this.closeDemo());
    this.querySelector('#demo-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'demo-modal') this.closeDemo();
    });
  }

  async init() {
    this.shell = await slice.build('AppShell', { activePage: 'exercises' });
    this.shell.querySelector('#shell-content').appendChild(this);
    document.querySelector('#app').appendChild(this.shell);

    const loading = await this.getLoading();
    loading.start();

    try {
      const planService = await slice.getComponent('PlanService');
      this.plan = await planService.getActivePlan();
      this.render();
    } catch (err) {
      console.error(err);
    } finally {
      loading.stop();
    }

    this.refreshIcons();
  }

  render() {
    if (!this.plan) return;
    const today = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'][new Date().getDay()];
    this.selectedDay = today;

    const summary = this.querySelector('#plan-summary');
    if (summary && this.plan.aiSummary) {
      summary.textContent = this.plan.aiSummary.substring(0, 100) + '...';
    }

    this.renderDayTabs();
    this.renderExercises();
    this.renderNutrition();
    this.refreshIcons();
  }

  renderDayTabs() {
    const tabs = this.querySelector('#day-tabs');
    if (!tabs || !this.plan?.days) return;

    tabs.innerHTML = this.plan.days.map(d => `
      <button class="day-tab ${d.day === this.selectedDay ? 'active' : ''}" data-day="${d.day}">
        ${d.day.substring(0, 3)}
      </button>
    `).join('');

    tabs.querySelectorAll('.day-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedDay = btn.dataset.day;
        tabs.querySelectorAll('.day-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderExercises();
        this.renderNutrition();
        this.refreshIcons();
      });
    });
  }

  renderExercises() {
    const list = this.querySelector('#exercise-list');
    if (!list) return;
    const day = this.plan?.days?.find(d => d.day === this.selectedDay);

    if (!day?.exercises?.length) {
      list.innerHTML = '<p class="no-data">Rest day — recovery matters</p>';
      return;
    }

    list.innerHTML = day.exercises.map((ex, i) => `
      <div class="exercise-row">
        <span class="ex-num">${String(i + 1).padStart(2, '0')}</span>
        <div class="ex-info">
          <p class="ex-name">${ex.name}</p>
          <p class="ex-meta">${ex.bodyPart} · ${ex.equipment}</p>
        </div>
        <div class="ex-metrics">
          <div class="metric">
            <span class="metric-label">Sets</span>
            <span class="metric-val">${ex.sets}</span>
          </div>
          <div class="metric">
            <span class="metric-label">Reps</span>
            <span class="metric-val">${ex.reps}</span>
          </div>
        </div>
        <button class="demo-btn" data-name="${this.escapeAttr(ex.name)}" data-english="${this.escapeAttr(ex.englishName || '')}">
          <i data-lucide="play-circle" class="icon-sm"></i> Demo
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.demo-btn').forEach(btn => {
      btn.addEventListener('click', () => this.showDemo(btn.dataset.name, btn.dataset.english));
    });
  }

  escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;');
  }

  async showDemo(name, englishName) {
    const modal = this.querySelector('#demo-modal');
    const title = this.querySelector('#demo-title');
    const body = this.querySelector('#demo-body');
    if (!modal) return;

    title.textContent = name;
    body.innerHTML = '<p class="demo-loading">Loading demo...</p>';
    modal.style.display = 'flex';

    const searchTerm = englishName && englishName.trim() ? englishName.trim() : name;

    try {
      const exerciseService = await slice.getComponent('ExerciseService');
      const result = await exerciseService.searchExercise(searchTerm);

      if (result?.gifUrl) {
        let html = `<img src="${result.gifUrl}" alt="${name}" class="demo-gif" />`;
        if (result.instructions?.length) {
          html += '<ol class="demo-instructions">' +
            result.instructions.map(s => `<li>${s.replace(/^Step \d+:\s*/i, '')}</li>`).join('') +
            '</ol>';
        }
        html += this.youtubeLinkHtml(name);
        body.innerHTML = html;
      } else {
        body.innerHTML = `
          <p class="demo-empty">No GIF demo found for this exercise.</p>
          ${this.youtubeLinkHtml(name)}
        `;
      }
    } catch (err) {
      body.innerHTML = `<p class="demo-empty">Could not load demo.</p>${this.youtubeLinkHtml(name)}`;
    }

    this.refreshIcons();
  }

  youtubeLinkHtml(name) {
    const query = encodeURIComponent(name + ' ejercicio tutorial');
    return `<a class="demo-yt-link" href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener">
      <i data-lucide="youtube" class="icon-sm"></i> Watch on YouTube
    </a>`;
  }

  closeDemo() {
    const modal = this.querySelector('#demo-modal');
    if (modal) modal.style.display = 'none';
  }

  renderNutrition() {
    const list = this.querySelector('#nutrition-list');
    if (!list) return;
    const day = this.plan?.days?.find(d => d.day === this.selectedDay);

    if (!day?.meals?.length) {
      list.innerHTML = '<p class="no-data">No meal data available.</p>';
      return;
    }

    list.innerHTML = day.meals.map(m => `
      <div class="meal-row">
        <div class="meal-row-top">
          <span class="meal-badge">${m.type}</span>
          <span class="meal-name">${m.name}</span>
        </div>
        <div class="meal-macros">
          <div class="macro">
            <span class="macro-label">Kcal</span>
            <span class="macro-val kcal">${m.calories}</span>
          </div>
          <div class="macro">
            <span class="macro-label">Protein</span>
            <span class="macro-val protein">${m.protein}g</span>
          </div>
          <div class="macro">
            <span class="macro-label">Carbs</span>
            <span class="macro-val">${m.carbs}g</span>
          </div>
          <div class="macro">
            <span class="macro-label">Fat</span>
            <span class="macro-val">${m.fats}g</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }
}

customElements.define('exercise-page', ExercisePage);