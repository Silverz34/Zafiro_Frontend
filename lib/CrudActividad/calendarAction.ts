'use server'

import { apiGet } from '../sincronizacion/apiClient';
import { ApiError } from '../sincronizacion/apiError';
import { lecturaActividad } from '../../interfaces/Preview'


export async function fetchDailyActivities(
): Promise<lecturaActividad[] | null> {
  try {
    const response = await apiGet<lecturaActividad[]>(
      `/api/activities/me`
    )
    if (!response.success) {
      console.error('[fetchDailyActivities] Respuesta fallida')
      return null
    }
    return response.data ?? []

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[fetchDailyActivities] Error ${error.status}:`, error.message)
    } else {
      console.error('[fetchDailyActivities] Error inesperado:', error)
    }
    return null
  }
}