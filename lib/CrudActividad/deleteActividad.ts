"use server";
import { apiDelete} from "../apiClient";
import { ApiError } from "../apiError";

export async function deleteActividad(id: string) {
  try {
    await apiDelete(`/api/activities/${id}`)
    return { success: true }
 
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        console.warn('[deleteActividad] Actividad no encontrada:', id)
        return { success: true }
      }
      console.error(`[deleteActividad] Error ${error.status}:`, error.message)
      return { success: false, error: error.message }
    }
    console.error('[deleteActividad] Error inesperado:', error)
    return { success: false, error: 'No se pudo eliminar la actividad' }
  }
}