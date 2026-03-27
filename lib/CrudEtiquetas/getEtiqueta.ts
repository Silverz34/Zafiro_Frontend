'use server'

import { apiGet } from "../sincronizacion/apiClient";

export type EtiquetaFrontend = {
  id: string;
  nombre: string;
  color: string;
};

export async function getEtiquetas() {
  try {
    const response = await apiGet<any[]>('/api/tags/me');
    if (response.success && response.data) {
      const etiquetasMapeadas = response.data.map((tag: any) => ({
        id: tag.id,
        nombre: tag.nombre, 
        color: tag.color
      }));
    
      return { success: true, data: etiquetasMapeadas };
    }
    
    return { success: true, data: [] };

  } catch (error) {
    console.error('[getEtiquetas] Error:', error);
    return { success: true, data: [] }; 
  }
}