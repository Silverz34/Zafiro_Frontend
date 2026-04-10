
import type { Agenda } from "../../../interfaces/Algorithm"
import { Clock, CalendarDays } from "lucide-react"

interface TaskProps {
  tarea:       Agenda
  isScheduled: boolean
}

function formatearFecha(isoString: string): string {
  return new Date(isoString).toLocaleDateString("es-MX", {
    weekday: "long",
    day:     "numeric",
    month:   "long",
  })
}

function formatearRango(inicio: string, fin: string): string {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString("es-MX", {
      hour:   "2-digit",
      minute: "2-digit",
    })
  return `${fmt(inicio)} – ${fmt(fin)}`
}

export default function Task({ tarea, isScheduled }: TaskProps) {
  const startISO = tarea.start.dateTime ?? tarea.start.date ?? ""
  const endISO   = tarea.end.dateTime   ?? tarea.end.date   ?? ""


  //visual colores de prioridad y etiquetas
  const tagColor = tarea.extras?.etiquetas?.color;
  const prioridadStr = tarea.extras?.prioridad;
  const dynamicCardStyle = tagColor
    ? { backgroundColor: `${tagColor}33`, borderColor: tagColor }
    : { backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: '#4b5563' }; 

  return (
    <div
      className="relative flex flex-col gap-1.5 p-3 rounded-xl border transition-all overflow-hidden"
      style={dynamicCardStyle}
    >
      <p className="text-sm font-semibold text-white leading-snug">
        {tarea.summary}
      </p>

      {isScheduled && startISO && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CalendarDays className="w-3 h-3 shrink-0" />
            <span className="capitalize">{formatearFecha(startISO)}</span>
          </div>
          {tarea.start.dateTime && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{formatearRango(startISO, endISO)}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-0.5 mb-1">
        <span
          className={`
            inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full
            ${isScheduled
              ? "bg-[#2FA941]/20 text-[#2FA941]"
              : "bg-[#AB3535]/20 text-[#AB3535]"}
          `}
        >
          {isScheduled ? "Agendada" : "Sin agendar"}
        </span>
      </div>
    </div>
  )
}