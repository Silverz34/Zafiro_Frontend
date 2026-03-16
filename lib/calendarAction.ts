'use server'

import { apiGet } from './apiClient';
import { ApiError } from './apiError';
import { GoogleEvent } from '../interfaces/Evento'

function buildRange(targetDateIso: string): { from: string; to: string } {
  const targetDate = new Date(targetDateIso)
  const year       = targetDate.getFullYear()
  const month      = targetDate.getMonth()

  const from = new Date(year, month, 1)
  const to   = new Date(year, month + 1, 0)

  from.setDate(from.getDate() - 10)
  to.setDate(to.getDate() + 10)
  from.setHours(0, 0, 0, 0)
  to.setHours(23, 59, 59, 999)

  return { from: from.toISOString(), to: to.toISOString() }
}

export async function fetchDailyActivities(
  targetDateIso: string
): Promise<GoogleEvent[] | null> {
  try {
    const { from, to } = buildRange(targetDateIso)

    // El backend devuelve: { success: true, data: GoogleEvent[], meta: {...} }
    // ApiResponse<T> mapea el campo "data" del body → response.data = GoogleEvent[]
    const response = await apiGet<GoogleEvent[]>(
      `/api/calendar/activities/me/range?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    )

    if (!response.success) {
      console.error('[fetchDailyActivities] Respuesta fallida')
      return null
    }

    // Log para verificar que llegan actividades
    console.log(`[fetchDailyActivities] Actividades recibidas: ${response.data?.length ?? 0}`)

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