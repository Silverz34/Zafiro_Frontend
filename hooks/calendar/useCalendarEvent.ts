'use client'

import { useState, useEffect } from 'react'
import { fetchDailyActivities } from '../../lib/CrudActividad/calendarAction'
import type { lecturaActividad } from '../../interfaces/Preview'

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