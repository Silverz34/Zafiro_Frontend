'use server'

import { apiDelete } from "../sincronizacion/apiClient";
import { ApiError } from "../sincronizacion/apiError";

export async function deleteEtiqueta(id: string) {
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

