'use server'

import { apiPatch} from './apiClient'
import { ApiError } from './apiError'
import { SchemaCrearActividad } from '../interfaces/Actividad'

type CambiosActividad = Partial<{
  summary:        string
  start:          { dateTime?: string; date?: string; timeZone?: string }
  end:            { dateTime?: string; date?: string; timeZone?: string }
  transparency:   'transparent' | 'opaque'
  reminders:      { useDefault: boolean; overrides?: { method: 'popup'; minutes: number }[] }
  prioridadValor: 'baja' | 'media' | 'alta'
}>


export async function updateActividad(
  id: string,
  cambios: CambiosActividad
) {
  try {
    // Validar solo los campos presentes — partial() hace todos opcionales
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