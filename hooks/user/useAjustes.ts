import { useState } from 'react';
import { saveAjustes } from '../../lib/sincronizacion/saveAjustes';
import type { Ajustes } from '../../interfaces/ajustes';
export function useAjustes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const guardarAjustes = async (payload: Ajustes) => {
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
    setError 
  };
}