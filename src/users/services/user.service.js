export class UserService {
  resourceEndpoint = '/db.json'; // lee desde el archivo estático

  /** Obtiene todos los usuarios */
  async getAll() {
    const res = await fetch(this.resourceEndpoint);
    const data = await res.json();
    return data.users || [];
  }

  /** Obtiene un usuario por ID */
  async getById(id) {
    const users = await this.getAll();
    return users.find(u => u.id == id) || null;
  }

  /** Buscar usuario por email (para login) */
  async getByEmail(email) {
    const users = await this.getAll();
    return users.find(u => u.email === email) || null;
  }

  /** Métodos no disponibles en modo lectura */
  create() {
    console.warn('⚠ Crear usuario no disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠ Editar usuario no disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠ Eliminar usuario no disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }
}
