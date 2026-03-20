'use server'

import { apiPatch } from '../api/apiClient'
import { ApiError } from '../api/apiError'
import { SchemaCrearActividad, type CrearActividad } from '../../interfaces/Actividad'

export async function updateActividad(
  id: string,
  cambios: Partial<CrearActividad>
) {
  try {
    // Validar solo los campos presentes partial() hace todos opcionales
    const validated = SchemaCrearActividad.partial().parse(cambios)

    const response = await apiPatch(
      `/api/activities/${id}`,
      validated
    )

    if (!response.success) {
      console.error('[updateActividad] Error en API:', response.message)
      return { success: false, error: response.message }
    }

    return { success: true, data: response.data }

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[updateActividad] Error ${error.status}:`, error.message)
      return { success: false, error: error.message }
    }
    console.error('[updateActividad] Error inesperado:', error)
    return { success: false, error: 'No se pudo actualizar la actividad' }
  }
}