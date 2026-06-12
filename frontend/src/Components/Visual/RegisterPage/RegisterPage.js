export default class RegisterPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$name = this.querySelector('#name');
    this.$email = this.querySelector('#email');
    this.$password = this.querySelector('#password');
    this.$registerBtn = this.querySelector('#register-btn');
    this.$loginLink = this.querySelector('#login-link');
    this.$nameError = this.querySelector('#name-error');
    this.$emailError = this.querySelector('#email-error');
    this.$passwordError = this.querySelector('#password-error');
    this.$globalError = this.querySelector('#global-error');

    this.$registerBtn.addEventListener('click', () => this.handleRegister());
    this.$loginLink.addEventListener('click', () => slice.router.navigate('/login'));
    this.$password.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleRegister(); });

    ['name', 'email', 'password'].forEach(f => {
      this.querySelector(`#${f}`).addEventListener('input', () => this.clearFieldError(f));
    });
  }

  clearFieldError(field) {
    this.querySelector(`#${field}`).classList.remove('error');
    this.querySelector(`#${field}-error`).textContent = '';
    this.$globalError.textContent = '';
  }

  validate() {
    let valid = true;
    const name = this.$name.value.trim();
    const email = this.$email.value.trim();
    const password = this.$password.value;

    if (!name || name.length < 2) {
      this.$nameError.textContent = 'Name must be at least 2 characters';
      this.$name.classList.add('error');
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.$emailError.textContent = 'Enter a valid email';
      this.$email.classList.add('error');
      valid = false;
    }

    if (!password || password.length < 6) {
      this.$passwordError.textContent = 'At least 6 characters';
      this.$password.classList.add('error');
      valid = false;
    }

    return valid;
  }

  async handleRegister() {
    this.$globalError.textContent = '';
    if (!this.validate()) return;

    const loading = await this.getLoading();
    loading.start();

    try {
      this.$registerBtn.disabled = true;
      this.$registerBtn.textContent = 'Creating account...';
      const authService = await slice.getComponent('AuthService');
      await authService.register(
        this.$name.value.trim(),
        this.$email.value.trim(),
        this.$password.value
      );
      slice.router.navigate('/onboarding');
    } catch (err) {
      this.$globalError.textContent = err.message;
    } finally {
      loading.stop();
      this.$registerBtn.disabled = false;
      this.$registerBtn.textContent = 'Create account';
    }
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }
}

customElements.define('register-page', RegisterPage);