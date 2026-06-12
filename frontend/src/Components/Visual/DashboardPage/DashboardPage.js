export default class DashboardPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.plan = null;
    this.user = null;
    this.currentDay = new Date().getDay();
    this.dayNames = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    this.dayShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  }

  async init() {
    this.shell = await slice.build('AppShell', { activePage: 'dashboard' });
    this.shell.querySelector('#shell-content').appendChild(this);
    document.querySelector('#app').appendChild(this.shell);

    const dateEl = this.querySelector('#dash-date');
    if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const loading = await this.getLoading();
    loading.start();

    try {
      const [authService, planService] = await Promise.all([
        slice.getComponent('AuthService'),
        slice.getComponent('PlanService'),
      ]);

      const [user, plan] = await Promise.all([
        authService.me(),
        planService.getActivePlan().catch(() => null),
      ]);

      this.user = user;
      this.plan = plan;
      this.render();
    } catch (err) {
      console.error(err);
    } finally {
      loading.stop();
    }

    this.querySelector('#chat-btn')?.addEventListener('click', () => slice.router.navigate('/chat'));
    this.querySelector('#view-plan-btn')?.addEventListener('click', () => slice.router.navigate('/exercises'));
  }

  render() {
    const today = this.dayNames[this.currentDay];
    const todayPlan = this.plan?.days?.find(d => d.day === today);
    const name = this.user?.name?.split(' ')[0] || 'Athlete';

    const greeting = this.querySelector('#greeting');
    if (greeting) greeting.textContent = `Hello, ${name}`;

    const bmiVal = this.querySelector('#bmi-value');
    const bmiStatus = this.querySelector('#bmi-status');
    if (bmiVal) bmiVal.textContent = this.user?.bmi || '--';
    if (bmiStatus && this.user?.bmi) {
      const bmi = this.user.bmi;
      const [text, cls] = bmi < 18.5 ? ['Underweight','warning'] : bmi < 25 ? ['Optimal','optimal'] : bmi < 30 ? ['Overweight','warning'] : ['Obese','danger'];
      bmiStatus.textContent = text;
      bmiStatus.className = `bmi-status ${cls}`;
    }

    if (this.plan?.warnings?.length > 0) {
      const card = this.querySelector('#warning-card');
      const content = this.querySelector('#warnings-content');
      if (card) card.style.display = 'flex';
      if (content) content.innerHTML = this.plan.warnings.slice(0, 2).map(w => `<p class="warning-item">${w}</p>`).join('');
    }

    const weekGrid = this.querySelector('#week-grid');
    if (weekGrid) {
      weekGrid.innerHTML = this.dayShort.map((d, i) => `
        <div class="day-cell ${i === this.currentDay ? 'today' : ''}">
          <span class="day-name">${d}</span>
          <div class="day-bar ${i < this.currentDay ? 'done' : ''}"></div>
        </div>
      `).join('');
    }

    const todayTag = this.querySelector('#today-tag');
    if (todayTag) todayTag.textContent = today;

    const exerciseList = this.querySelector('#exercise-list');
    if (exerciseList) {
      if (!todayPlan?.exercises?.length) {
        exerciseList.innerHTML = '<p class="empty-state">Rest day — recovery is part of training 💪</p>';
      } else {
        exerciseList.innerHTML = todayPlan.exercises.map((ex, i) => `
          <div class="exercise-item">
            <span class="ex-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="ex-info">
              <p class="ex-name">${ex.name}</p>
              <p class="ex-meta">${ex.bodyPart} · ${ex.equipment}</p>
            </div>
            <div class="ex-stats">
              <div class="ex-stat"><span class="stat-label">Sets</span><span class="stat-val">${ex.sets}</span></div>
              <div class="ex-stat"><span class="stat-label">Reps</span><span class="stat-val">${ex.reps}</span></div>
            </div>
          </div>
        `).join('');
      }
    }

    const aiSummary = this.querySelector('#ai-summary');
    if (aiSummary && this.plan?.aiSummary) {
      aiSummary.textContent = `"${this.plan.aiSummary.substring(0, 150)}..."`;
    }

    const goalVal = this.querySelector('#goal-value');
    const actLevel = this.querySelector('#activity-level');
    if (goalVal && this.user?.goal) goalVal.textContent = this.user.goal.replace(/_/g, ' ');
    if (actLevel && this.user?.activityLevel) actLevel.textContent = this.user.activityLevel.replace(/_/g, ' ');

    this.refreshIcons();
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

customElements.define('dashboard-page', DashboardPage);