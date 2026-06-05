export default class AuthService {
  constructor(props) {
    this.baseUrl = 'http://localhost:5000/api';
  }

  isAuthenticated() {
    return !!localStorage.getItem('userId');
  }

  async register(name, email, password) {
    const res = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al registrar');
    localStorage.setItem('userId', data.userId);
    return data;
  }

  async login(email, password) {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
    localStorage.setItem('userId', data.userId);
    return data;
  }

  async logout() {
    await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    localStorage.removeItem('userId');
    localStorage.removeItem('profileId');
  }

  async me() {
    const res = await fetch(`${this.baseUrl}/auth/me`, {
      credentials: 'include',
    });
    if (!res.ok) throw new Error('No autenticado');
    return await res.json();
  }
}