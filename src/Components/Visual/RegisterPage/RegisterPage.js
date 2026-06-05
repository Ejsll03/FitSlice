export default class RegisterPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);

    this.$name = this.querySelector('#name');
    this.$email = this.querySelector('#email');
    this.$password = this.querySelector('#password');
    this.$registerBtn = this.querySelector('#register-btn');
    this.$loginLink = this.querySelector('#login-link');
    this.$error = this.querySelector('#error-msg');

    this.$registerBtn.addEventListener('click', () => this.handleRegister());
    this.$loginLink.addEventListener('click', () => slice.router.navigate('/login'));
  }

  async handleRegister() {
    this.$error.textContent = '';
    const name = this.$name.value.trim();
    const email = this.$email.value.trim();
    const password = this.$password.value.trim();

    if (!name || !email || !password) {
      this.$error.textContent = 'ERR: TODOS LOS CAMPOS SON REQUERIDOS';
      return;
    }

    try {
      this.$registerBtn.disabled = true;
      this.$registerBtn.querySelector('span > span:first-child').textContent = 'PROCESSING...';
      const authService = await slice.getComponent('AuthService');
      await authService.register(name, email, password);
      slice.router.navigate('/onboarding');
    } catch (err) {
      this.$error.textContent = `ERR: ${err.message.toUpperCase()}`;
    } finally {
      this.$registerBtn.disabled = false;
      this.$registerBtn.querySelector('span > span:first-child').textContent = 'ESTABLISH_LINK';
    }
  }
}

customElements.define('register-page', RegisterPage);