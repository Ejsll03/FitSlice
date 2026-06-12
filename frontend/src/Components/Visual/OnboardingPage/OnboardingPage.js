export default class OnboardingPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.currentStep = 1;
    this.totalSteps = 5;
    this.formData = {};
  }

  async init() {
    this.renderStep();
    this.updateProgress();
    this.bindNavigation();
  }
  updateProgress() {
    const progress = Math.round((this.currentStep / this.totalSteps) * 100);
    const bar = this.querySelector('#progress-bar');
    const label = this.querySelector('#step-label');
    if (bar) bar.style.width = `${progress}%`;
    if (label) label.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
  }

renderStep() {
  const content = this.querySelector('#step-content');
  if (!content) return;
  const steps = {
    1: this.stepBasicInfo(),
    2: this.stepGoal(),
    3: this.stepActivity(),
    4: this.stepConditions(),
    5: this.stepEquipment(),
  };
  content.innerHTML = steps[this.currentStep] || '';
  this.bindStepEvents();
}

  stepBasicInfo() {
    return `
      <h1 class="step-title">YOUR <span class="accent">BIOMETRICS</span></h1>
      <p class="step-desc">Enter your body data so the AI can calibrate your training and nutrition plan accurately.</p>
      <div class="fields-grid">
        <div class="field-group">
          <label class="field-label">Age (years)</label>
          <input class="field-input" type="number" id="age" placeholder="25" value="${this.formData.age || ''}" min="14" max="100"/>
        </div>
        <div class="field-group">
          <label class="field-label">Weight (kg)</label>
          <input class="field-input" type="number" id="weight" placeholder="75" value="${this.formData.weight || ''}" min="30" max="300"/>
        </div>
        <div class="field-group">
          <label class="field-label">Height (cm)</label>
          <input class="field-input" type="number" id="height" placeholder="175" value="${this.formData.height || ''}" min="100" max="250"/>
        </div>
      </div>
    `;
  }

  stepGoal() {
    const goals = [
      { key: 'lose_weight', icon: '🔥', name: 'Lose Weight', desc: 'Caloric deficit + cardio' },
      { key: 'gain_muscle', icon: '💪', name: 'Gain Muscle', desc: 'Progressive overload' },
      { key: 'maintain', icon: '⚖️', name: 'Maintain', desc: 'Equilibrium monitoring' },
      { key: 'rehabilitation', icon: '🩹', name: 'Rehabilitation', desc: 'Low-impact recovery' },
      { key: 'cardiovascular_health', icon: '❤️', name: 'Cardio Health', desc: 'Heart optimization' },
      { key: 'endurance', icon: '🏃', name: 'Endurance', desc: 'Aerobic capacity' },
      { key: 'flexibility', icon: '🧘', name: 'Flexibility', desc: 'Range of motion' },
      { key: 'stress_relief', icon: '🌊', name: 'Stress Relief', desc: 'Mental wellness' },
      { key: 'strength', icon: '🏋️', name: 'Strength', desc: 'Max force output' },
      { key: 'body_recomposition', icon: '✨', name: 'Recomposition', desc: 'Lose fat + gain muscle' },
      { key: 'active_senior', icon: '🌿', name: 'Active Senior', desc: 'Healthy aging' },
      { key: 'postpartum', icon: '🤱', name: 'Postpartum', desc: 'Safe recovery' },
    ];
    return `
      <h1 class="step-title">YOUR <span class="accent">GOAL</span></h1>
      <p class="step-desc">Select your primary training objective. The AI will calibrate your plan accordingly.</p>
      <div class="goals-grid">
        ${goals.map(g => `
          <div class="goal-card ${this.formData.goal === g.key ? 'selected' : ''}" data-goal="${g.key}">
            <span class="goal-icon">${g.icon}</span>
            <p class="goal-name">${g.name}</p>
            <p class="goal-desc">${g.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  stepActivity() {
    const levels = [
      { key: 'sedentary', name: 'Sedentary', desc: 'Little or no exercise' },
      { key: 'light', name: 'Light', desc: '1–3 days/week' },
      { key: 'moderate', name: 'Moderate', desc: '3–5 days/week' },
      { key: 'active', name: 'Active', desc: '6–7 days/week' },
      { key: 'very_active', name: 'Athlete', desc: 'Intense daily training' },
    ];
    return `
      <h1 class="step-title">ACTIVITY <span class="accent">LEVEL</span></h1>
      <p class="step-desc">How active are you currently? This helps calibrate your plan intensity.</p>
      <div class="activity-list">
        ${levels.map(l => `
          <div class="activity-card ${this.formData.activityLevel === l.key ? 'selected' : ''}" data-activity="${l.key}">
            <div>
              <p class="activity-name">${l.name}</p>
              <p class="activity-desc">${l.desc}</p>
            </div>
            <span class="activity-check">${this.formData.activityLevel === l.key ? '✓' : ''}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  stepConditions() {
    return `
      <h1 class="step-title">HEALTH <span class="accent">PROFILE</span></h1>
      <p class="step-desc">Any medical conditions or dietary preferences? The AI will adapt your plan to keep you safe.</p>
      <div class="field-group" style="max-width:560px; margin-bottom:24px">
        <label class="field-label">Medical conditions / injuries (optional)</label>
        <input class="field-input" type="text" id="conditions" style="font-size:15px; font-family:var(--font-body)" placeholder="e.g. knee injury, diabetes, hypertension" value="${this.formData.conditionsRaw || ''}"/>
        <p class="field-hint">Separate multiple conditions with commas</p>
      </div>
      <div class="field-group" style="max-width:560px">
        <label class="field-label">Dietary preferences (optional)</label>
        <input class="field-input" type="text" id="dietPreferences" style="font-size:15px; font-family:var(--font-body)" placeholder="e.g. vegan, gluten-free, no dairy" value="${this.formData.dietRaw || ''}"/>
        <p class="field-hint">Separate multiple preferences with commas</p>
      </div>
    `;
  }

  stepEquipment() {
    return `
      <h1 class="step-title">EQUIPMENT <span class="accent">AVAILABLE</span></h1>
      <p class="step-desc">Describe what equipment you have access to. The AI will only include exercises you can actually do.</p>
      <div class="field-group" style="max-width:560px">
        <label class="field-label">Available equipment</label>
        <textarea class="field-textarea" id="equipment" placeholder="e.g. dumbbells only, full gym access, resistance bands, no equipment...">${this.formData.availableEquipment || ''}</textarea>
        <p class="field-hint">Be as specific as possible for better results</p>
      </div>
      <div class="ready-box">
        <span class="ready-icon">⚡</span>
        <div>
          <p class="ready-title">Ready to generate your plan</p>
          <p class="ready-desc">The AI will create a complete 7-day workout and nutrition plan tailored to everything you've entered.</p>
        </div>
      </div>
    `;
  }

  bindStepEvents() {
    this.querySelectorAll('.goal-card').forEach(card => {
      card.addEventListener('click', () => {
        this.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.formData.goal = card.dataset.goal;
      });
    });

    this.querySelectorAll('.activity-card').forEach(card => {
      card.addEventListener('click', () => {
        this.querySelectorAll('.activity-card').forEach(c => {
          c.classList.remove('selected');
          const check = c.querySelector('.activity-check');
          if (check) check.textContent = '';
        });
        card.classList.add('selected');
        const check = card.querySelector('.activity-check');
        if (check) check.textContent = '✓';
        this.formData.activityLevel = card.dataset.activity;
      });
    });
  }

  bindNavigation() {
    const nextBtn = this.querySelector('#next-btn');
    const backBtn = this.querySelector('#back-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    if (backBtn) backBtn.addEventListener('click', () => this.back());
  }

  collectStepData() {
    if (this.currentStep === 1) {
      this.formData.age = parseInt(this.querySelector('#age')?.value);
      this.formData.weight = parseFloat(this.querySelector('#weight')?.value);
      this.formData.height = parseFloat(this.querySelector('#height')?.value);
    }
    if (this.currentStep === 4) {
      const cond = this.querySelector('#conditions')?.value || '';
      const diet = this.querySelector('#dietPreferences')?.value || '';
      this.formData.conditionsRaw = cond;
      this.formData.dietRaw = diet;
      this.formData.conditions = cond ? cond.split(',').map(s => s.trim()).filter(Boolean) : [];
      this.formData.dietPreferences = diet ? diet.split(',').map(s => s.trim()).filter(Boolean) : [];
    }
    if (this.currentStep === 5) {
      this.formData.availableEquipment = this.querySelector('#equipment')?.value || 'no equipment';
    }
  }

  async next() {
    this.collectStepData();
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.renderStep();
      this.updateProgress();
    } else {
      await this.submit();
    }
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.renderStep();
      this.updateProgress();
    }
  }

  async submit() {
    const nextBtn = this.querySelector('#next-btn');
    if (nextBtn) { nextBtn.disabled = true; nextBtn.textContent = 'Generating plan...'; }

    const loading = await this.getLoading();
    loading.start();

    try {
      const [profileService, planService] = await Promise.all([
        slice.getComponent('ProfileService'),
        slice.getComponent('PlanService'),
      ]);

      await profileService.createProfile({
        age: this.formData.age,
        weight: this.formData.weight,
        height: this.formData.height,
        goal: this.formData.goal,
        conditions: this.formData.conditions || [],
        dietPreferences: this.formData.dietPreferences || [],
        activityLevel: this.formData.activityLevel,
        availableEquipment: this.formData.availableEquipment,
      });

      await planService.generate();
      slice.router.navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (nextBtn) { nextBtn.disabled = false; nextBtn.textContent = 'Generate my plan →'; }
    } finally {
      loading.stop();
    }
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }
}

customElements.define('onboarding-page', OnboardingPage);