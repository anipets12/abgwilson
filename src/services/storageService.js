import { supabase } from '../config/supabase';
import { toast } from 'react-hot-toast';

/**
 * Servicio completo para gestionar el almacenamiento de archivos e imágenes con Supabase Storage
 */
class StorageService {
  /**
   * Sube un archivo al bucket especificado
   * @param {File} file - Archivo a subir
   * @param {string} bucket - Nombre del bucket ('images', 'documents', etc)
   * @param {string} path - Ruta dentro del bucket (ej: 'profiles/', 'cases/')
   * @param {object} metadata - Metadatos opcionales para el archivo
   * @returns {Promise<{path: string, url: string}|null>} - Ruta y URL del archivo o null si hay error
   */
  async uploadFile(file, bucket = 'images', path = '', metadata = {}) {
    try {
      if (!file) {
        throw new Error('No se proporcionó ningún archivo');
      }

      // Crear nombre único para el archivo para evitar colisiones
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const fullPath = path ? `${path}/${fileName}` : fileName;

      // Subir archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fullPath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
          metadata
        });

      if (error) throw error;

      // Obtener URL pública
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fullPath);

      return {
        path: data.path,
        url: urlData.publicUrl
      };
    } catch (error) {
      console.error('Error al subir archivo:', error);
      toast.error('Error al subir el archivo. Intente nuevamente.');
      return null;
    }
  }

  /**
   * Descarga un archivo desde el storage
   * @param {string} path - Ruta del archivo
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<Blob|null>} - Blob del archivo o null si hay error
   */
  async downloadFile(path, bucket = 'images') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al descargar archivo:', error);
      toast.error('No se pudo descargar el archivo');
      return null;
    }
  }

  /**
   * Elimina un archivo del storage
   * @param {string} path - Ruta del archivo
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<boolean>} - true si se eliminó correctamente
   */
  async deleteFile(path, bucket = 'images') {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error al eliminar archivo:', error);
      toast.error('No se pudo eliminar el archivo');
      return false;
    }
  }

  /**
   * Lista archivos en un directorio
   * @param {string} path - Directorio a listar
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<Array|null>} - Lista de archivos o null si hay error
   */
  async listFiles(path = '', bucket = 'images') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .list(path, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error al listar archivos:', error);
      return null;
    }
  }

  /**
   * Actualiza los metadatos de un archivo
   * @param {string} path - Ruta del archivo
   * @param {object} metadata - Nuevos metadatos
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<boolean>} - true si se actualizó correctamente
   */
  async updateMetadata(path, metadata, bucket = 'images') {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .update(path, undefined, {
          cacheControl: '3600',
          metadata
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error al actualizar metadatos:', error);
      return false;
    }
  }

  /**
   * Crea una URL firmada para acceso temporal a un archivo
   * @param {string} path - Ruta del archivo
   * @param {number} expiresIn - Tiempo en segundos hasta que expire el enlace
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<string|null>} - URL firmada o null si hay error
   */
  async createSignedUrl(path, expiresIn = 3600, bucket = 'images') {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error) throw error;
      return data.signedUrl;
    } catch (error) {
      console.error('Error al crear URL firmada:', error);
      return null;
    }
  }

  /**
   * Copia un archivo a una nueva ubicación
   * @param {string} fromPath - Ruta de origen
   * @param {string} toPath - Ruta de destino
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<boolean>} - true si se copió correctamente
   */
  async copyFile(fromPath, toPath, bucket = 'images') {
    try {
      // Primero descargamos el archivo
      const fileBlob = await this.downloadFile(fromPath, bucket);
      if (!fileBlob) return false;

      // Luego lo subimos a la nueva ubicación
      const { error } = await supabase.storage
        .from(bucket)
        .upload(toPath, fileBlob, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error al copiar archivo:', error);
      return false;
    }
  }

  /**
   * Mueve un archivo a una nueva ubicación (copia y elimina)
   * @param {string} fromPath - Ruta de origen
   * @param {string} toPath - Ruta de destino
   * @param {string} bucket - Nombre del bucket
   * @returns {Promise<boolean>} - true si se movió correctamente
   */
  async moveFile(fromPath, toPath, bucket = 'images') {
    try {
      const copied = await this.copyFile(fromPath, toPath, bucket);
      if (!copied) return false;

      return await this.deleteFile(fromPath, bucket);
    } catch (error) {
      console.error('Error al mover archivo:', error);
      return false;
    }
  }
}

export default new StorageService();
