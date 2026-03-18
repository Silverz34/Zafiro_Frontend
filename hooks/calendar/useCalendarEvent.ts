'use client'

import { useState, useEffect } from 'react'
import { fetchDailyActivities } from '../../lib/calendarAction'
import type { Actividad } from '../../interfaces/Actividad'

interface UseCalendarEventsProps {
  ready: boolean
  currentDate: Date
}

interface UseCalendarEventsReturn {
  events: Actividad[]
  recargarEventos: () => void
}

export function useCalendarEvents({
  ready,
  currentDate,
}: UseCalendarEventsProps): UseCalendarEventsReturn {
  const [events, setEvents] = useState<Actividad[]>([])
  const [lastFetchedMonth, setLastFetchedMonth] = useState<string | null>(null)

  useEffect(() => {
    if (!ready) return

    const monthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`
    if (lastFetchedMonth === monthKey) return

    const load = async () => {
      const data = await fetchDailyActivities(currentDate.toISOString())
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