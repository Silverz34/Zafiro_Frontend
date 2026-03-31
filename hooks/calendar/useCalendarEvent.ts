'use client'

import { useState, useEffect } from 'react'
import { fetchGoogleEvents } from '../../lib/CrudActividad/fetchActividad'
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

      // getMonthBoundaries ya existe en utils/dateUtils.ts
      const { timeMin, timeMax } = getMonthBoundaries(currentDate)
      const data = await fetchGoogleEvents(timeMin, timeMax)
      if (data) {
        setEvents(data)
        setLastFetchedMonth(monthKey)
      }
    }

    load()
  }, [ready, currentDate, lastFetchedMonth])

  const recargarEventos = () => setLastFetchedMonth(null)

  return { events, recargarEventos }
}