import { generarRegla } from '../hooks/calendar/Ocurrencia'
import type { FormActividad, PrioridadType } from '../interfaces/types/FormActividad'
import type { CrearActividad } from '../interfaces/Actividad'


function mapPrioridad(prioridad: PrioridadType): 'alta' | 'media' | 'baja' {
  return prioridad.toLowerCase() as 'alta' | 'media' | 'baja'
}

function toLocalISOString(fecha: string, hora: string): string {
  const dt = new Date(`${fecha}T${hora}:00`)
  const offsetMinutes = dt.getTimezoneOffset()
  const sign = offsetMinutes <= 0 ? '+' : '-'
  const absOffset = Math.abs(offsetMinutes)
  const hh = String(Math.floor(absOffset / 60)).padStart(2, '0')
  const mm = String(absOffset % 60).padStart(2, '0')
  return `${fecha}T${hora}:00${sign}${hh}:${mm}`
}

export function buildActivityPayload(form: FormActividad): CrearActividad {
  const startISO = form.isAllDay
    ? undefined
    : toLocalISOString(form.fecha, form.horaInicio)

  const endISO = form.isAllDay
    ? undefined
    : toLocalISOString(form.fecha, form.horaFin)

  const payload: CrearActividad = {
    summary: form.titulo,
    description: form.description,
    start: form.isAllDay
      ? { date: form.fecha }
      : { dateTime: startISO, timeZone: 'America/Mexico_City' },

    end: form.isAllDay
      ? { date: form.fecha }
      : { dateTime: endISO, timeZone: 'America/Mexico_City' },

    transparency: form.transparency === 'transparent' ? 'transparent' : undefined,

    recurrence: generarRegla(
      startISO ?? `${form.fecha}T00:00:00`,
      form.recurrence
    ),

    reminders: form.reminder === 'none'
      ? { useDefault: false }
      : {
        useDefault: false,
        overrides: [{ method: 'email', minutes: parseInt(form.reminder) }],
      },

    prioridadValor: mapPrioridad(form.prioridad),
    idEtiqueta: form.idEtiqueta,
    source: 'local',
  }

  return payload
}