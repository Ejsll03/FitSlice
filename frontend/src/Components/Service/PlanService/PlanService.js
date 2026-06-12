export default class PlanService {
  constructor(props) {
    this.baseUrl = 'http://localhost:5000/api';
  }

  async generate(availableEquipment = null) {
    const body = availableEquipment ? { availableEquipment } : {};
    const res = await fetch(`${this.baseUrl}/plans/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al generar el plan');
    return data;
  }

  async getActivePlan() {
    const res = await fetch(`${this.baseUrl}/plans/active/me`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'No hay plan activo');
    return data;
  }

  async getPlanById(id) {
    const res = await fetch(`${this.baseUrl}/plans/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Plan no encontrado');
    return data;
  }
}