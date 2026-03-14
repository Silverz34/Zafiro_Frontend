'use server'
import { apiGet, ApiError } from "./apiClient";
import { GoogleEvent } from "../interfaces/Evento";

interface RangeResponse {
  data: GoogleEvent[]
  meta: {
    count: number
    from: string
    to: string
  }
}

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
 
  return {
    from: from.toISOString(),
    to:   to.toISOString(),
  }
}

export async function fetchDailyActivities(targetDateIso: string):Promise<GoogleEvent[] |null>{
 try {
    const { from, to } = buildRange(targetDateIso)
 
    const response = await apiGet<RangeResponse>(
      `/api/calendar/activities/me/range?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    )
 
    if (!response.success || !response.data) {
      console.error('[fetchDailyActivities] Respuesta inesperada')
      return null
    }
 
    // La API intermedia devuelve { data: GoogleEvent[], meta: {...} }
    // Antes Google devolvía { items: GoogleEvent[] }
    // Solo cambia de dónde sacamos el array — los componentes no se enteran
    return response.data.data ?? []
 
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[fetchDailyActivities] Error ${error.status}:`, error.message)
    } else {
      console.error('[fetchDailyActivities] Error inesperado:', error)
    }
    return null
  }
}

