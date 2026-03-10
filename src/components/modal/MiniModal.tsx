'use client'

import { HiX, HiOutlineCalendar, HiOutlineBell } from "react-icons/hi";
import { BriefcaseBusiness, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MiniModal } from "../../../interfaces/Evento";

interface EventoPreviewProps {
  evento:  MiniModal | null;
  onClose: () => void;
  onEdit?:   (evento: MiniModal) => void;
  onDelete?: (id: string) => void;
}


function formatearFecha(dateTime?: string, date?: string): string {
  const raw = dateTime ?? date;
  if (!raw) return "—";

  const d = new Date(raw);
  return d.toLocaleDateString("es-MX", {
    weekday: "long",
    day:     "numeric",
    month:   "long",
    year:    "numeric",
  });
}

function formatearHora(dateTime?: string): string {
  if (!dateTime) return "";
  return new Date(dateTime).toLocaleTimeString("es-MX", {
    hour:   "2-digit",
    minute: "2-digit",
  });
}

function formatearRecordatorio(minutes?: number): string {
  if (minutes === undefined) return "—";
  if (minutes === 0)    return "Al momento del evento";
  if (minutes < 60)     return `${minutes} minutos antes`;
  return `${minutes} minutos antes`;
}


export default function EventoPreview({ evento, onClose, onEdit, onDelete }: EventoPreviewProps) {
  if (!evento) return null;

  const esAllDay    = !evento.start.dateTime;
  const horaInicio  = formatearHora(evento.start.dateTime);
  const horaFin     = formatearHora(evento.end.dateTime);
  const fecha       = formatearFecha(evento.start.dateTime, evento.start.date);
  const esLibre     = evento.transparency === "transparent";
  const reminder    = evento.reminders?.overrides?.[0];

  return (
    <Dialog open={!!evento} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#0d0c1e] border border-[#2554E0] text-white
          max-w-sm w-full rounded-2xl
          shadow-2xl shadow-blue-950/60
          p-0 gap-0 overflow-hidden
          [&>button]:hidden
        "
      >
       
        <div className="h-1.5 w-full bg-blue-600" />

        <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
          <h2 className="text-lg font-bold text-white leading-snug flex-1 pr-2">
            {evento.summary ?? "Sin título"}
          </h2>
          <div className="flex items-center gap-1 shrink-0">
            {onEdit && (
              <button
                onClick={() => onEdit(evento)}
                className="text-gray-400 hover:text-white hover:bg-white/8 rounded-lg p-1.5 transition-all"
                title="Editar"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(evento.id)}
                className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg p-1.5 transition-all"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white hover:bg-white/8 rounded-lg p-1.5 transition-all"
              title="Cerrar"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-px bg-[#1e1d3a] mx-5" />
        <div className="px-5 py-4 flex flex-col gap-4">

          <div className="flex items-start gap-3">
            <HiOutlineCalendar className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm text-white font-medium capitalize">
                {fecha}
              </span>
              {!esAllDay && (
                <span className="text-xs text-gray-400 mt-0.5">
                  {horaInicio} — {horaFin}
                </span>
              )}
              {esAllDay && (
                <span className="text-xs text-gray-400 mt-0.5">
                  Todo el día
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HiOutlineBell className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-sm text-gray-300">
              {reminder
                ? formatearRecordatorio(reminder.minutes)
                : "Sin recordatorio"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BriefcaseBusiness className="w-4 h-4 text-blue-400 shrink-0" />
            <span
              className={`
                text-xs font-semibold px-2.5 py-1 rounded-full border
                ${esLibre
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                  : "bg-blue-500/10  border-blue-500/40  text-blue-300"}
              `}
            >
              {esLibre ? "Libre" : "Ocupado"}
            </span>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}