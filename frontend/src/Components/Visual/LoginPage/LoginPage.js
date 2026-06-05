export default class LoginPage extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    this.$email = this.querySelector('#email');
    this.$password = this.querySelector('#password');
    this.$loginBtn = this.querySelector('#login-btn');
    this.$registerLink = this.querySelector('#register-link');
    this.$error = this.querySelector('#error-msg');

    this.$loginBtn.addEventListener('click', () => this.handleLogin());
    this.$registerLink.addEventListener('click', () => {
      slice.router.navigate('/register');
    });
  }

  async handleLogin() {
    this.$error.textContent = '';
    const email = this.$email.value.trim();
    const password = this.$password.value.trim();

    if (!email || !password) {
      this.$error.textContent = 'Por favor completa todos los campos.';
      return;
    }

    try {
      this.$loginBtn.disabled = true;
      this.$loginBtn.textContent = 'Iniciando sesión...';
      const authService = await slice.getComponent('AuthService');
      await authService.login(email, password);
      slice.router.navigate('/dashboard');
    } catch (err) {
      this.$error.textContent = err.message;
    } finally {
      this.$loginBtn.disabled = false;
      this.$loginBtn.textContent = 'Iniciar sesión';
    }
  }
}

customElements.define('login-page', LoginPage);