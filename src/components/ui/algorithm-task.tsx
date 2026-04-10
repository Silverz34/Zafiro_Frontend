
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

  return (
    <div
      className={`
        flex flex-col gap-1.5 p-3 rounded-xl border transition-all
        ${isScheduled
          ? "bg-[#2FA941]/10 border-[#2FA941]/40"
          : "bg-[#AB3535]/10 border-[#AB3535]/40"}
      `}
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

      <div className="mt-0.5">
        <span
          className={`
            inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full
            ${isScheduled
              ? "bg-[#2FA941]/20 text-[#2FA941]"
              : "bg-[#AB3535]/20 text-[#AB3535]"}
          `}
        >
          {isScheduled ? "Agendada" : "Sin espacio disponible"}
        </span>
      </div>
    </div>
  )
}