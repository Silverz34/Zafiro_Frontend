'use server'
import { apiDelete } from '../sincronizacion/apiClient'
import { ApiError } from '../sincronizacion/apiError'

export type DeleteMode = 'single' | 'all'

export async function deleteActividad(
  id: string,
  mode: DeleteMode = 'single',
  recurringEventId?: string
) {
  try {

    //Por defecto, preparamos la ruta para borrar un solo evento
    let endpoint = `/api/activities/${id}?mode=single`;

    //Si el usuario confirmó borrar toda la serie y tenemos el ID maestro, cambiamos la ruta
    if (mode === 'all' && recurringEventId) {
      endpoint = `/api/activities/${recurringEventId}?mode=all`;
    } 
    await apiDelete(endpoint)
    return { success: true }

  } catch (error) {
    if (error instanceof ApiError) {
      // Si el backend responde 404 (No encontrado), asumimos que ya se borró y devolvemos éxito
      if (error.status === 404) return { success: true }
      console.error(`[deleteActividad] Error ${error.status}:`, error.message)
      return { success: false, error: error.message }
    }
    console.error('[deleteActividad] Error inesperado:', error)
    return { success: false, error: 'No se pudo eliminar' }
  }
}