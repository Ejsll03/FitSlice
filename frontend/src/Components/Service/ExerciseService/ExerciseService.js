export default class ExerciseService {
  constructor(props) {
    this.baseUrl = 'http://localhost:5000/api';
    this.cache = {};
  }

  async getExercises({ bodyPart, equipment, search, limit = 20, offset = 0 } = {}) {
    let url = `${this.baseUrl}/exercises?limit=${limit}&offset=${offset}`;
    if (bodyPart) url += `&bodyPart=${bodyPart}`;
    if (equipment) url += `&equipment=${equipment}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    const res = await fetch(url, { credentials: 'include' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al obtener ejercicios');
    return data;
  }

  async getExerciseById(id) {
    const res = await fetch(`${this.baseUrl}/exercises/${id}`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ejercicio no encontrado');
    return data;
  }

  /**
   * Busca un ejercicio por nombre y devuelve el más parecido,
   * incluyendo su gifUrl e instrucciones si existen.
   * Cachea resultados para no repetir llamadas.
   */
  async searchExercise(name) {
    if (this.cache[name] !== undefined) return this.cache[name];

    try {
      const data = await this.getExercises({ search: name, limit: 5 });
      const list = Array.isArray(data) ? data : (data?.data || data?.exercises || data?.results || []);

      if (!list || list.length === 0) {
        this.cache[name] = null;
        return null;
      }

      const lowerName = name.toLowerCase();
      const exact = list.find(ex => ex.name?.toLowerCase() === lowerName);
      const result = exact || list[0];

      this.cache[name] = result;
      return result;
    } catch (err) {
      console.error('searchExercise error:', err);
      this.cache[name] = null;
      return null;
    }
  }
}