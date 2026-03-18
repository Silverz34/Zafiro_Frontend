import { apiDelete } from "../api/apiClient";
import { ApiError } from "../api/apiError";

export async function deleteEtiqueta(id: number) {
  try {
    await apiDelete(`/api/tags/${id}`);
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[deleteEtiqueta] Error ${error.status}:`, error.message);
      return { success: false, error: error.message };
    }
    return { success: false, error: 'No se pudo eliminar la etiqueta' };
  }
}

