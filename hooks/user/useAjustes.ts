import { useState } from 'react';
import { saveAjustes, AjustesPayload } from '../../lib/api/saveAjustes';

export function useAjustes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const guardarAjustes = async (payload: AjustesPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await saveAjustes(payload);
      if (!success) {
        setError("No se pudieron guardar los ajustes. Intenta de nuevo.");
        return false;
      }
      return true;
    } catch (err) {
      setError("Ocurrió un error inesperado de red.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    guardarAjustes,
    isLoading,
    error,
    setError // Por si necesitas limpiar el error manualmente desde la vista
  };
}