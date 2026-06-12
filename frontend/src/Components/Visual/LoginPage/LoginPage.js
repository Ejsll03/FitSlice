export default class LoginPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$email = this.querySelector('#email');
    this.$password = this.querySelector('#password');
    this.$loginBtn = this.querySelector('#login-btn');
    this.$registerLink = this.querySelector('#register-link');
    this.$emailError = this.querySelector('#email-error');
    this.$passwordError = this.querySelector('#password-error');
    this.$globalError = this.querySelector('#global-error');

    this.$loginBtn.addEventListener('click', () => this.handleLogin());
    this.$registerLink.addEventListener('click', () => slice.router.navigate('/register'));
    this.$password.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.handleLogin(); });
    this.$email.addEventListener('input', () => this.clearFieldError('email'));
    this.$password.addEventListener('input', () => this.clearFieldError('password'));
  }

  clearFieldError(field) {
    if (field === 'email') {
      this.$email.classList.remove('error');
      this.$emailError.textContent = '';
    }
    if (field === 'password') {
      this.$password.classList.remove('error');
      this.$passwordError.textContent = '';
    }
    this.$globalError.textContent = '';
  }

  validate() {
    let valid = true;
    const email = this.$email.value.trim();
    const password = this.$password.value;

    if (!email) {
      this.$emailError.textContent = 'Email is required';
      this.$email.classList.add('error');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.$emailError.textContent = 'Enter a valid email';
      this.$email.classList.add('error');
      valid = false;
    }

    if (!password) {
      this.$passwordError.textContent = 'Password is required';
      this.$password.classList.add('error');
      valid = false;
    } else if (password.length < 6) {
      this.$passwordError.textContent = 'At least 6 characters';
      this.$password.classList.add('error');
      valid = false;
    }

    return valid;
  }

  async handleLogin() {
    this.$globalError.textContent = '';
    if (!this.validate()) return;

    const loading = await this.getLoading();
    loading.start();

    try {
      this.$loginBtn.disabled = true;
      this.$loginBtn.textContent = 'Signing in...';
      const authService = await slice.getComponent('AuthService');
      await authService.login(this.$email.value.trim(), this.$password.value);
      slice.router.navigate('/dashboard');
    } catch (err) {
      this.$globalError.textContent = err.message;
    } finally {
      loading.stop();
      this.$loginBtn.disabled = false;
      this.$loginBtn.textContent = 'Sign in';
    }
  }

  async getLoading() {
    if (!slice.controller.getComponent('Loading')) {
      return await slice.build('Loading', { sliceId: 'Loading' });
    }
    return slice.controller.getComponent('Loading');
  }
}

customElements.define('login-page', LoginPage);