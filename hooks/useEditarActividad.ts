import { toast }            from "sonner";
import { updateActividad }  from "../lib/updateActividad";

interface EditarProps {
  onClose:   () => void;
  onSuccess: () => void;
}

export function useEditarActividad({ onClose, onSuccess }: EditarProps) {
  const handleEditar = async (
    id: string,
    cambios: Record<string, unknown>,
    setLoading: (v: boolean) => void
  ) => {
    setLoading(true);
    const result = await updateActividad(id, cambios);
    setLoading(false);

    if (result.success) {
      toast.success("Actividad actualizada");
      onSuccess();
      onClose();
    } else {
      toast.error("No se pudo actualizar la actividad");
    }
  };

  return { handleEditar };
}