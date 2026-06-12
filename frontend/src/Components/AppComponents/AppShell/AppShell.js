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
    this.refreshIcons();
  }

  renderNav() {
    const items = [
      { key: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard', path: '/dashboard' },
      { key: 'exercises', label: 'Routine', icon: 'dumbbell', path: '/exercises' },
      { key: 'chat', label: 'AI Coach', icon: 'message-circle', path: '/chat' },
    ];

    const nav = this.querySelector('#shell-nav');
    if (!nav) return;

    nav.innerHTML = items.map(item => `
      <a class="nav-item ${this.activePage === item.key ? 'active' : ''}" data-path="${item.path}">
        <i data-lucide="${item.icon}" class="icon-sm"></i>
        <span>${item.label}</span>
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

  refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  async generatePlan() {
    const btn = this.querySelector('#start-btn');
    const label = btn?.querySelector('span');
    if (btn) { btn.disabled = true; if (label) label.textContent = 'Generating...'; }

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
      if (btn) { btn.disabled = false; if (label) label.textContent = 'Start Session'; }
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