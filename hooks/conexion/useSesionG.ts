import { useState, useEffect, use } from "react";
import { initiateGoogle, getGoogle, disconnectGoogle } from "../../lib/sincronizacion/authGoogle/google";

export function useGoogleSync() {

  const [isConnected, setConnected] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkStatus() {
      setLoading(true);
      try {
        const status = await getGoogle();
        setConnected(status?.connected || false);
      } catch (error) {
        console.error('Error al verificar el estado en Google', error);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    }
    checkStatus();
  }, []);
  const toggleSync = async (checked: boolean) => {
    if (checked) {
      const response = await initiateGoogle();
      if (response?.success && response.url) {
        
        // Validar que la URL pertenezca a Google antes de redirigir
        const allowed = ['https://accounts.google.com', 'https://oauth2.googleapis.com'];
        const isValid = allowed.some(origin => response.url.startsWith(origin));
        if (!isValid) {
          console.error('[Google OAuth] URL de redirect sospechosa:', response.url);
          return;
        }
        window.location.href = response.url;
      }
    }
  };

  return { isConnected, isLoading, toggleSync };
}