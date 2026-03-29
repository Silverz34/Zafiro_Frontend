'use client'

import { useState, useEffect } from 'react'
import { fetchDailyActivities } from '../../lib/CrudActividad/fetchActividad'
import type { lecturaActividad } from '../../interfaces/Preview'
import { getMonthBoundaries } from '../../utils/dateUtils'

interface UseCalendarEventsProps {
  ready: boolean
  currentDate: Date
}

interface UseCalendarEventsReturn {
  events: lecturaActividad[]
  recargarEventos: () => void
}

export function useCalendarEvents({
  ready,
  currentDate,
}: UseCalendarEventsProps): UseCalendarEventsReturn {
  
  const [events, setEvents] = useState<lecturaActividad[]>([])
  const [lastFetchedMonth, setLastFetchedMonth] = useState<string | null>(null)

  useEffect(() => {

    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    if (lastFetchedMonth === monthKey) return

    const load = async () => {
      const { timeMin, timeMax } = getMonthBoundaries(currentDate)
      const data = await fetchDailyActivities(timeMin, timeMax)
      
      // SOLO guardamos en el estado si es un arreglo real
      if (Array.isArray(data)) {
        setEvents(data)
        setLastFetchedMonth(monthKey)
      } else {
        // Si la API devolvió algo raro, imprimimos el error y limpiamos la vista
        console.error('[useCalendarEvents] Se esperaba un arreglo, pero se recibió:', data);
        setEvents([]); 
      }
    }
    if (ready) {
      load()
    }
  }, [ready, currentDate, lastFetchedMonth])

  const recargarEventos = () => setLastFetchedMonth(null)

  return { events, recargarEventos }
}