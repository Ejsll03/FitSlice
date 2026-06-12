export default class AppShell extends HTMLElement {
  static props = {
    activePage: { type: 'string', default: 'dashboard', required: false }
  };

  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
  }

  async init() {
    this.renderNav();
    this.bindEvents();
  }

  renderNav() {
    const items = [
      { key: 'dashboard', label: 'Dashboard', icon: '⊞', path: '/dashboard' },
      { key: 'exercises', label: 'Routine', icon: '🏋️', path: '/exercises' },
      { key: 'chat', label: 'AI Coach', icon: '💬', path: '/chat' },
    ];

    const nav = this.querySelector('#shell-nav');
    if (!nav) return;

    nav.innerHTML = items.map(item => `
      <a class="nav-item ${this.activePage === item.key ? 'active' : ''}" data-path="${item.path}">
        <span class="nav-item-icon">${item.icon}</span>
        ${item.label}
      </a>
    `).join('');

    nav.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => slice.router.navigate(link.dataset.path));
    });
  }

  bindEvents() {
    this.querySelector('#logout-btn')?.addEventListener('click', () => this.logout());
    this.querySelector('#start-btn')?.addEventListener('click', () => this.generatePlan());
    this.querySelector('#theme-btn')?.addEventListener('click', () => this.toggleTheme());
  }

  async generatePlan() {
    const btn = this.querySelector('#start-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Generating...'; }
    try {
      const loading = await this.getLoading();
      loading.start();
      const planService = await slice.getComponent('PlanService');
      await planService.generate();
      slice.router.navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      const loading = slice.controller.getComponent('Loading');
      if (loading) loading.stop();
      if (btn) { btn.disabled = false; btn.textContent = '⚡ Start Session'; }
    }
  }

  async toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'Dark';
    const next = current === 'Dark' ? 'Light' : 'Dark';
    await slice.setTheme(next);
  }

  async logout() {
    const authService = await slice.getComponent('AuthService');
    await authService.logout();
    slice.router.navigate('/login');
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }

  get activePage() { return this._activePage; }
  set activePage(value) { this._activePage = value; }
}

customElements.define('app-shell', AppShell);