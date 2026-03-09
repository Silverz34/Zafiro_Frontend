import { useState }              from "react";
import { toast }                 from "sonner";
import { createActividad } from "../lib/createActividad";
import type { FormActividad } from "../lib/types/FormActividad";
import type { TipoOcurrencia } from "./Ocurrencia";
import { TIME_SLOTS, type TimeSlot } from "@/components/ui/time";
import type { PrioridadType } from "./custom/modalconstantes";

interface UseModalProps {
  onClose:   () => void;
  onSuccess: () => void;
}

export function useModalActividad({ onClose, onSuccess }: UseModalProps) {
  const [titulo,       setTitulo]       = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker,   setShowPicker]   = useState(false);
  const [horaInicio,   setHoraInicio]   = useState("09:00");
  const [horaFin,      setHoraFin]      = useState("10:00");
  const [isAllDay,     setIsAllDay]     = useState(false);
  const [recurrencia,  setRecurrencia]  = useState("none");
  const [reminder,     setReminder]     = useState("10");
  const [prioridad,    setPrioridad]    = useState<PrioridadType>("Media");
  const [ocupacion,    setOcupacion]    = useState("opaque");
  const [loading,      setLoading]      = useState(false);

  const handleHoraInicio = (val: string) => {
    setHoraInicio(val);
    if (val >= horaFin) {
      const idx  = TIME_SLOTS.findIndex((s: TimeSlot) => s.value === val);
      const next = TIME_SLOTS[idx + 1];
      if (next) setHoraFin(next.value);
    }
  };

  const handleGuardar = async () => {
    if (!titulo.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setLoading(true);

    const form: FormActividad = {
      titulo,
      fecha:       selectedDate.toISOString().split("T")[0],
      horaInicio,
      horaFin,
      isAllDay,
      recurrencia: recurrencia as TipoOcurrencia,
      reminder,
      ocupacion:   ocupacion as "opaque" | "transparent",
      prioridad,
    };

    const result = await createActividad(form);
    setLoading(false);

    if (result.success) {
      toast.success("Actividad creada", {
        description: `"${titulo}" fue agregada a tu calendario.`,
      });
      onSuccess();
      onClose();
    } else {
      toast.error("No se pudo crear la actividad", {
        description: "Verifica tu conexión e intenta de nuevo.",
      });
    }
  };

  return {
    // estados
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
    // handlers
    handleHoraInicio,
    handleGuardar,
  };
}