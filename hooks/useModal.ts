import { useState, useEffect }     from "react";
import { useCrearActividad }       from "./useCrearActividad";
import { useEditarActividad }      from "./useEditarActividad";
import { TIME_SLOTS, type TimeSlot } from "@/components/ui/time";
import type { ModoModal, PrioridadType } from "./custom/modalconstantes";
import type { MiniModal }          from "../interfaces/Preview";
import type { TipoOcurrencia }     from "./Ocurrencia";
import type { FormActividad }      from "../interfaces/types/FormActividad";

interface UseModalProps {
  onClose:        () => void;
  onSuccess:      () => void;
  eventoInicial?: MiniModal | null;
  modo:           ModoModal;
}

export function useModalActividad({ onClose, onSuccess, eventoInicial, modo }: UseModalProps) {
  const [titulo,       setTitulo]       = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker,   setShowPicker]   = useState(false);
  const [horaInicio,   setHoraInicio]   = useState("09:00");
  const [horaFin,      setHoraFin]      = useState("10:00");
  const [isAllDay,     setIsAllDay]     = useState(false);
  const [recurrencia,  setRecurrencia]  = useState("none");
  const [reminder,     setReminder]     = useState("10");
  const [prioridad,    setPrioridad]    = useState<PrioridadType>("Media");
  const [ocupacion,    setOcupacion]    = useState<"opaque" | "transparent">("opaque");
  const [loading,      setLoading]      = useState(false);

  const { handleCrear }  = useCrearActividad({ onClose, onSuccess });
  const { handleEditar } = useEditarActividad({ onClose, onSuccess });

  
  useEffect(() => {
    if (eventoInicial) {
      setTitulo(eventoInicial.summary ?? "");
      setIsAllDay(!eventoInicial.start.dateTime);
      if (eventoInicial.start.dateTime) {
        const start = new Date(eventoInicial.start.dateTime);
        setSelectedDate(start);
        setHoraInicio(start.toTimeString().slice(0, 5));
      }
      if (eventoInicial.end.dateTime) {
        setHoraFin(new Date(eventoInicial.end.dateTime).toTimeString().slice(0, 5));
      }
      setOcupacion(eventoInicial.transparency ?? "opaque");
      const override = eventoInicial.reminders?.overrides?.[0];
      setReminder(override ? String(override.minutes) : "none");
    } else {
      setTitulo("");
      setSelectedDate(new Date());
      setHoraInicio("09:00");
      setHoraFin("10:00");
      setIsAllDay(false);
      setRecurrencia("none");
      setReminder("10");
      setOcupacion("opaque");
      setPrioridad("Media");
    }
  }, [eventoInicial]);

  const handleHoraInicio = (val: string) => {
    setHoraInicio(val);
    if (val >= horaFin) {
      const idx  = TIME_SLOTS.findIndex((s: TimeSlot) => s.value === val);
      const next = TIME_SLOTS[idx + 1];
      if (next) setHoraFin(next.value);
    }
  };

  const handleGuardar = async () => {
    if (!titulo.trim()) return;

    const fecha = selectedDate.toISOString().split("T")[0];

    if (modo === "editar" && eventoInicial?.id) {
      await handleEditar(
        eventoInicial.id,
        {
          summary: titulo,
          start: isAllDay
            ? { date: fecha }
            : { dateTime: `${fecha}T${horaInicio}:00`, timeZone: "America/Mexico_City" },
          end: isAllDay
            ? { date: fecha }
            : { dateTime: `${fecha}T${horaFin}:00`, timeZone: "America/Mexico_City" },
          transparency: ocupacion,
          reminders: reminder === "none"
            ? { useDefault: false }
            : { useDefault: false, overrides: [{ method: "popup", minutes: parseInt(reminder) }] },
        },
        setLoading
      );
    } else {
      await handleCrear(
        {
          titulo, fecha, horaInicio, horaFin, isAllDay,
          recurrencia: recurrencia as TipoOcurrencia,
          reminder, ocupacion, prioridad,
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
    recurrencia, setRecurrencia,
    reminder, setReminder,
    prioridad, setPrioridad,
    ocupacion, setOcupacion,
    loading,
    handleHoraInicio,
    handleGuardar,
  };
}