export default class ProfileService {
  constructor(props) {
    this.baseUrl = 'http://localhost:5000/api';
  }

  async createProfile(profileData) {
  const res = await fetch(`${this.baseUrl}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || (data.errors ? data.errors.map(e => e.message).join(', ') : 'Error al guardar perfil'));
  return data;
}

  async getProfile(id) {
    const res = await fetch(`${this.baseUrl}/profiles/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Perfil no encontrado');
    return data;
  }

  async updateProfile(id, profileData) {
    const res = await fetch(`${this.baseUrl}/profiles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar perfil');
    return data;
  }

  calculateBMI(weight, height) {
    return parseFloat((weight / ((height / 100) ** 2)).toFixed(1));
  }
}