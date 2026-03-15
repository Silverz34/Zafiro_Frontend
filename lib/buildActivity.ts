import { generarRegla } from '../hooks/Ocurrencia'
import type { FormActividad, PrioridadType } from '../interfaces/types/FormActividad'

export interface ActivityPayload {
  summary:        string
  start:          { dateTime?: string; date?: string; timeZone?: string }
  end:            { dateTime?: string; date?: string; timeZone?: string }
  transparency?:  'transparent' | 'opaque'
  recurrence?:    string[]
  reminders?:     { useDefault: boolean; overrides?: { method: 'popup'; minutes: number }[] }
  prioridadValor?: 'baja' | 'media' | 'alta'
  source:         'local'
}

function mapPrioridad(prioridad: PrioridadType): 'alta' | 'media' | 'baja' {
  return prioridad.toLowerCase() as 'alta' | 'media' | 'baja'
}

export function buildActivityPayload(form: FormActividad): ActivityPayload {
  const startISO = form.isAllDay
    ? undefined
    : `${form.fecha}T${form.horaInicio}:00`

  const endISO = form.isAllDay
    ? undefined
    : `${form.fecha}T${form.horaFin}:00`

  const payload: ActivityPayload = {
    summary: form.titulo,

    start: form.isAllDay
      ? { date: form.fecha }
      : { dateTime: startISO, timeZone: 'America/Mexico_City' },

    end: form.isAllDay
      ? { date: form.fecha }
      : { dateTime: endISO, timeZone: 'America/Mexico_City' },

    transparency: form.ocupacion === 'transparent' ? 'transparent' : undefined,
    recurrence: generarRegla(
      startISO ?? `${form.fecha}T00:00:00`,
      form.recurrencia
    ),

    reminders: form.reminder === 'none'
      ? { useDefault: false }
      : {
          useDefault: false,
          overrides: [{ method: 'popup', minutes: parseInt(form.reminder) }],
        },

    prioridadValor: mapPrioridad(form.prioridad),

    // Siempre 'local' — las actividades creadas desde el frontend
    // son locales hasta que se sincronicen con Google
    source: 'local',
  }

  return payload
}