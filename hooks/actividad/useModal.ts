import { useState, useEffect } from "react";
import { useCrearActividad } from "./useCrearActividad";
import { useEditarActividad } from "./useEditarActividad";
import { TIME_SLOTS, type TimeSlot } from "@/components/ui/time";
import type { ModoModal, PrioridadType } from "../custom/modalconstantes";
import type { FormActividad } from "../../interfaces/types/FormActividad";
import type { MiniModal } from "../../interfaces/Preview";
import { generarRegla, type TipoOcurrencia } from "../calendar/Ocurrencia";


interface UseModalProps {
  onClose: () => void;
  onSuccess: () => void;
  eventoInicial?: MiniModal | null;
  modo: ModoModal;
}

function mapPrioridad(prioridad: PrioridadType): 'alta' | 'media' | 'baja' {
  return prioridad.toLowerCase() as 'alta' | 'media' | 'baja'
}


function extractLocalDateString(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(d);
}

function extractLocalTimeString(isoString: string): string {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(d);
}

function toLocalDateString(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

function toLocalISOString(fecha: string, hora: string): string {
  return `${fecha}T${hora}:00-06:00`
}

function parsePrioridadValor(prioridad?: string): PrioridadType {
  if (!prioridad) return "media";
  if (prioridad.toLowerCase() === "alta") return "alta";
  if (prioridad.toLowerCase() === "baja") return "baja";
  return "media";
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
  const [prioridad, setPrioridad] = useState<PrioridadType>("media");
  const [transparency, setTransparency] = useState<"opaque" | "transparent">("opaque");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [idEtiqueta, setIdEtiqueta] = useState<number | undefined>(undefined);

  const { handleCrear } = useCrearActividad({ onClose, onSuccess });
  const { handleEditar } = useEditarActividad({ onClose, onSuccess });

  useEffect(() => {
    if (eventoInicial) {
      const valorPrioridad = eventoInicial.prioridadValor || (eventoInicial as any).prioridad?.valor;
  
      setPrioridad(parsePrioridadValor(valorPrioridad));
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
      setIdEtiqueta(eventoInicial.idEtiqueta ?? (eventoInicial as any).etiqueta?.id);
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
      setPrioridad("media");
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
    const idCrudo = (eventoInicial as any)?.localId || eventoInicial?.id;
    const idMaestro = idCrudo ? idCrudo.toString().split('_')[0] : '';

    if (modo === "editar" && idMaestro) {
      const startISO = isAllDay ? undefined : toLocalISOString(fecha, horaInicio);
      const fechaInicioParaRegla = startISO ?? `${fecha}T00:00:00-06:00`;
      const reglaCalculada = generarRegla(fechaInicioParaRegla, recurrence as TipoOcurrencia);

      await handleEditar(
       idMaestro, 
        {
          summary: titulo,
          description: description,
          start: isAllDay
            ? { date: fecha }
            : { dateTime: startISO, timeZone: "America/Mexico_City" },
          end: isAllDay
            ? { date: fecha }
            : { dateTime: toLocalISOString(fecha, horaFin), timeZone: "America/Mexico_City" },
          transparency: transparency,
          reminders: reminder === "none"
            ? { useDefault: false }
            : { useDefault: false, overrides: [{ method: "email", minutes: parseInt(reminder) }] },
          prioridadValor: mapPrioridad(prioridad),
          idEtiqueta: idEtiqueta,
          recurrence: reglaCalculada,
          source: 'local',
        },
        setLoading
      );

    } else {
      await handleCrear(
        {
          titulo, fecha, horaInicio, horaFin, isAllDay,
          recurrence: recurrence as TipoOcurrencia,
          reminder, transparency, prioridad,description, idEtiqueta, source: 'local' 
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