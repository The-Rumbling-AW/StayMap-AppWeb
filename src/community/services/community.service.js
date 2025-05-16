import { Community } from '@/community/model/community.entity';

export class CommunityService {
  resourceEndpoint = '/db.json'; // Carga el archivo estático

  /**
   * Recupera todas las comunidades
   * @returns {Promise<Array<Community>>}
   */
  async getAll() {
    try {
      const response = await fetch(this.resourceEndpoint);
      const json = await response.json();

      if (!json.communities || !Array.isArray(json.communities)) {
        console.error('❌ El JSON no tiene una propiedad "communities" válida');
        return [];
      }

      return json.communities.map(c => new Community(c));
    } catch (error) {
      console.error('❌ Error al cargar comunidades:', error);
      return [];
    }
  }

  async getById(id) {
    const communities = await this.getAll();
    return communities.find(c => c.id === id) || null;
  }

  async getByName(name) {
    const communities = await this.getAll();
    return communities.filter(c =>
      c.nombre?.toLowerCase().includes(name.toLowerCase())
    );
  }

  create() {
    console.warn('⚠ Crear comunidades no está disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠ Editar comunidades no está disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠ Eliminar comunidades no está disponible en modo lectura.');
    return Promise.reject('Método no implementado.');
  }
}
