
import { apiGet } from "../api/apiClient";

export async function getEtiquetas() {
  try {
    const response = await apiGet<any[]>('/api/tags'); 

    if (response.success && response.data) {
      const etiquetasMapeadas = response.data.map((tag: any) => ({
        id: tag.id,
        label: tag.etiqueta,
        color: tag.color
      }));
      return { success: true, data: etiquetasMapeadas };
    }
    return { success: false, error: 'No se pudieron obtener las etiquetas' };

  } catch (error) {
    console.error('[getEtiquetas] Error:', error);
    return { success: false, error: 'Error interno al cargar etiquetas' };
  }
}