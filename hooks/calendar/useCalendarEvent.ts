'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchGoogleEvents } from '../../lib/CrudActividad/fetchActividad'
import type { lecturaActividad } from '../../interfaces/Preview'
import { getCalendarViewRange } from '../../utils/dateUtils'

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
  const lastFetchedMonth = useRef<string | null>(null)

  const [reloadTrigger, setReloadTrigger] = useState(0)

  useEffect(() => {
    // Guardia: si el usuario no está listo, no hacer nada
    if (!ready) return

    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    // La comparación sigue funcionando, pero ahora sin disparar el efecto al actualizar
    if (lastFetchedMonth.current === monthKey) return

    const load = async () => {
      const { timeMin, timeMax } = getCalendarViewRange(currentDate)
      const data = await fetchGoogleEvents(timeMin, timeMax)
      if (data) {
        setEvents(data)
        lastFetchedMonth.current = monthKey 
      }
    }

    load()
  }, [ready, currentDate, reloadTrigger]) 

  const recargarEventos = () => {
    lastFetchedMonth.current = null      // Limpiar el mes cacheado
    setReloadTrigger(t => t + 1)        // Forzar que el efecto corra de nuevo
  }

  return { events, recargarEventos }
}
