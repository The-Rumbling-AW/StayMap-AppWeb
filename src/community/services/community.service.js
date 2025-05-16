import { Community } from '@/community/model/community.entity';

export class CommunityService {
  resourceEndpoint = import.meta.env.VITE_COMMUNITIES_ENDPOINT_PATH || '/db.json';

  /**
   * Recupera todas las comunidades desde el archivo db.json en /public
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

  /**
   * Recupera una comunidad por ID
   * @param {string} id
   * @returns {Promise<Community|null>}
   */
  async getById(id) {
    const communities = await this.getAll();
    return communities.find(c => c.id === id) || null;
  }

  /**
   * Busca comunidades por nombre (case-insensitive)
   * @param {string} name
   * @returns {Promise<Array<Community>>}
   */
  async getByName(name) {
    const communities = await this.getAll();
    return communities.filter(c =>
      c.nombre?.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * No disponible en modo estático
   */
  create() {
    console.warn('⚠ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }
}
