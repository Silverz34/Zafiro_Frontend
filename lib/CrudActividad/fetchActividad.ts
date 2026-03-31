'use server'

import { apiGet } from '../sincronizacion/apiClient'
import { ApiError } from '../sincronizacion/apiError'
import type { lecturaActividad } from '../../interfaces/Preview'

interface GoogleEventsResponse {
  items: lecturaActividad[]
  nextPageToken?: string
  nextSyncToken?: string
}

export async function fetchGoogleEvents(
  timeMin: string,
  timeMax: string
): Promise<lecturaActividad[] | null> {
  try {
    const params = new URLSearchParams({
      timeMin,
      timeMax,
      singleEvents: 'true',
      orderBy: 'startTime',
    })

    const response = await apiGet<GoogleEventsResponse>(
      `/api/integrations/google/events?${params.toString()}`
    )
    
    if (!response.success) {
      console.error('[fetchGoogleEvents] Respuesta fallida')
      return null
    }

    // Google events vienen en data.items, no en data directamente
    console.log(response.data?.items)
    return response.data?.items ?? []
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[fetchGoogleEvents] Error ${error.status}:`, error.message)
    } else {
      console.error('[fetchGoogleEvents] Error inesperado:', error)
    }
    return null
  }
}