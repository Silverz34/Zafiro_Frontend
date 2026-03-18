import { useState, useEffect } from "react";
import { useCrearActividad } from "./useCrearActividad";
import { useEditarActividad } from "./useEditarActividad";
import { TIME_SLOTS, type TimeSlot } from "@/components/ui/time";
import type { ModoModal, PrioridadType } from "../custom/modalconstantes";
import type { TipoOcurrencia } from "../calendar/Ocurrencia";
import type { FormActividad } from "../../interfaces/types/FormActividad";
import type { CrearActividad } from "../../interfaces/Actividad";

interface UseModalProps {
  onClose: () => void;
  onSuccess: () => void;
  eventoInicial?: CrearActividad | null;
  modo: ModoModal;
}

function mapPrioridad(prioridad: PrioridadType): 'alta' | 'media' | 'baja' {
  return prioridad.toLowerCase() as 'alta' | 'media' | 'baja'
}


function extractLocalDateString(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Mexico_City',
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(d);
  const year = parts.find(p => p.type === 'year')?.value;
  const month = parts.find(p => p.type === 'month')?.value;
  const day = parts.find(p => p.type === 'day')?.value;
  return `${year}-${month}-${day}`;
}

function extractLocalTimeString(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    hour: '2-digit', minute: '2-digit', hour12: false
  }).format(d);
}

function toLocalDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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

function parsePrioridadValor(prioridad?: string): PrioridadType {
  if (!prioridad) return "Media";
  if (prioridad.toLowerCase() === "alta") return "Alta";
  if (prioridad.toLowerCase() === "baja") return "Baja";
  return "Media";
}

function parseRecurrence(recurrenceArgs?: string[]): TipoOcurrencia {
  if (!recurrenceArgs || recurrenceArgs.length === 0) return "none";
  const rrule = recurrenceArgs[0];
  if (rrule.includes("FREQ=DAILY")) return "daily";
  if (rrule.includes("FREQ=WEEKLY")) {
    if (rrule.includes("BYDAY=MO,TU,WE,TH,FR")) return "weekdays";
    return "weekly";
  }
  return "none";
}

export function useModalActividad({ onClose, onSuccess, eventoInicial, modo }: UseModalProps) {
  const [titulo, setTitulo] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [horaInicio, setHoraInicio] = useState("09:00");
  const [horaFin, setHoraFin] = useState("10:00");
  const [isAllDay, setIsAllDay] = useState(false);
  const [recurrence, setRecurrence] = useState("none");
  const [reminder, setReminder] = useState("10");
  const [prioridad, setPrioridad] = useState<PrioridadType>("Media");
  const [transparency, setTransparency] = useState<"opaque" | "transparent">("opaque");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [idEtiqueta, setIdEtiqueta] = useState<number | undefined>(undefined);

  const { handleCrear } = useCrearActividad({ onClose, onSuccess });
  const { handleEditar } = useEditarActividad({ onClose, onSuccess });

  useEffect(() => {
    if (eventoInicial) {
      setTitulo(eventoInicial.summary ?? "");
      setIsAllDay(!eventoInicial.start.dateTime);
      setDescription(eventoInicial.description ?? "");
      if (eventoInicial.start.dateTime) {
        const isoString = eventoInicial.start.dateTime;
        const localDateStr = extractLocalDateString(isoString);

        setSelectedDate(new Date(`${localDateStr}T12:00:00`));
        setHoraInicio(extractLocalTimeString(isoString));
      }
      if (eventoInicial.end.dateTime) {
        setHoraFin(extractLocalTimeString(eventoInicial.end.dateTime));
      }
      setTransparency(eventoInicial.transparency ?? "opaque");
      const override = eventoInicial.reminders?.overrides?.[0];
      setReminder(override ? String(override.minutes) : "none");
      setIdEtiqueta(eventoInicial.idEtiqueta);
      setPrioridad(parsePrioridadValor(eventoInicial.prioridadValor));
      setRecurrence(parseRecurrence(eventoInicial.recurrence));
      
    } else {
      setTitulo("");
      setDescription("");
      setIdEtiqueta(undefined);
      setSelectedDate(new Date());
      setHoraInicio("09:00");
      setHoraFin("10:00");
      setIsAllDay(false);
      setRecurrence("none");
      setReminder("10");
      setTransparency("opaque");
      setPrioridad("Media");
    }
  }, [eventoInicial]);

  const handleHoraInicio = (val: string) => {
    setHoraInicio(val);
    if (val >= horaFin) {
      const idx = TIME_SLOTS.findIndex((s: TimeSlot) => s.value === val);
      const next = TIME_SLOTS[idx + 1];
      if (next) setHoraFin(next.value);
    }
  };

  const handleGuardar = async () => {
    if (!titulo.trim()) return;

    const fecha = toLocalDateString(selectedDate);
    const idParaActualizar = (eventoInicial as any)?.localId || eventoInicial?.id;

    if (modo === "editar" && eventoInicial?.id) {
      await handleEditar(
       idParaActualizar,
        {
          summary: titulo,
          description: description,
          start: isAllDay
            ? { date: fecha }
            : {
              dateTime: toLocalISOString(fecha, horaInicio),
              timeZone: "America/Mexico_City"
            },
          end: isAllDay
            ? { date: fecha }
            : {
              dateTime: toLocalISOString(fecha, horaFin),
              timeZone: "America/Mexico_City"
            },
          transparency: transparency,
          reminders: reminder === "none"
            ? { useDefault: false }
            : { useDefault: false, overrides: [{ method: "popup", minutes: parseInt(reminder) }] },
          prioridadValor: mapPrioridad(prioridad),
          idEtiqueta: idEtiqueta,
          recurrence: recurrence === "none" ? [] : [
            recurrence === "daily" ? "RRULE:FREQ=DAILY" :
            recurrence === "weekdays" ? "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR" :
            recurrence === "weekly" ? "RRULE:FREQ=WEEKLY" :
            recurrence === "monthly" ? "RRULE:FREQ=MONTHLY" : "RRULE:FREQ=YEARLY"
          ]
        },
        setLoading
      );
    } else {
      await handleCrear(
        {
          titulo, fecha, horaInicio, horaFin, isAllDay,
          recurrence: recurrence as TipoOcurrencia,
          reminder, transparency, prioridad,description, idEtiqueta 
        } as FormActividad,
        setLoading
      );
    }
  };

  return {
    titulo, setTitulo,
    selectedDate, setSelectedDate,
    showPicker, setShowPicker,
    horaInicio, horaFin, setHoraFin,
    isAllDay, setIsAllDay,
    recurrence, setRecurrence,
    reminder, setReminder,
    prioridad, setPrioridad,
    transparency, setTransparency,
    loading,
    idEtiqueta, setIdEtiqueta,
    description, setDescription,
    handleHoraInicio,
    handleGuardar,
  };
}