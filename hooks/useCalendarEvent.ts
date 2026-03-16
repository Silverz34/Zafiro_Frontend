'use client'

import { useState, useEffect } from 'react'
import { fetchDailyActivities } from '../lib/calendarAction'
import type { GoogleEvent } from '../interfaces/Evento'

interface UseCalendarEventsProps {
  ready:       boolean
  currentDate: Date
}

interface UseCalendarEventsReturn {
  events:          GoogleEvent[]
  recargarEventos: () => void
}

export function useCalendarEvents({
  ready,
  currentDate,
}: UseCalendarEventsProps): UseCalendarEventsReturn {
  const [events,           setEvents]           = useState<GoogleEvent[]>([])
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