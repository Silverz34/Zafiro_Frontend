import { toast }           from "sonner";
import { createActividad } from "../lib/createActividad";
import type { FormActividad } from "../interfaces/types/FormActividad";

interface CrearProps {
  onClose:   () => void;
  onSuccess: () => void;
}

export function useCrearActividad({ onClose, onSuccess }: CrearProps) {
  const handleCrear = async (
    form: FormActividad,
    setLoading: (v: boolean) => void
  ) => {
    setLoading(true);
    const result = await createActividad(form);
    setLoading(false);

    if (result.success) {
      toast.success("Actividad creada", {
        description: `"${form.titulo}" fue agregada a tu calendario.`,
      });
      onSuccess();
      onClose();
    } else {
      toast.error("No se pudo crear la actividad");
    }
  };

  return { handleCrear };
}