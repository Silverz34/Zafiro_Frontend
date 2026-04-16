import { useState, useEffect, use } from "react";
import { initiateGoogle, getGoogle, disconnectGoogle } from "../../lib/sincronizacion/authGoogle/google";

export function useGoogleSync() {

  const [isConnected, setConnected] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

 // hooks/conexion/useSesionG.ts
useEffect(() => {
  async function checkStatus() {
    setLoading(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const fromOAuth = params.get('google_connected') === 'true';
      
      if (fromOAuth) {
        window.history.replaceState({}, '', window.location.pathname);
        // Dar tiempo al backend para procesar
        await new Promise(resolve => setTimeout(resolve, 800));
      }

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
    setLoading(true);
    try {
      if (checked) {
        console.log('[Frontend] Switch activado. Solicitando URL...');
        const response = await initiateGoogle();
        
        console.log('[Frontend] Respuesta de initiateGoogle:', response);

        if (response?.success && response.url) {
          
          // Limpiamos la URL de posibles espacios en blanco
          const cleanUrl = response.url.trim();

          const allowed = [
            'https://accounts.google.com',
            'https://oauth2.googleapis.com',
            'https://www.googleapis.com',
          ];
          
          const isValid = allowed.some(origin => cleanUrl.startsWith(origin));
          
          if (!isValid) {
            // Si entra aquí, verás este log en la consola de tu navegador (F12)
            console.error('[Frontend] URL bloqueada por seguridad. Recibimos:', cleanUrl); 
            setLoading(false);
            return;
          }

          console.log('[Frontend]  URL válida. Redirigiendo a Google...');
          // assign es el estándar en React para salir de la app hacia una URL externa
          window.location.assign(cleanUrl); 
          return; 
        } else {
          console.error('[Frontend] Error o no hay URL:', response?.error);
        }
      } else {
        const response = await disconnectGoogle();
        if (response?.success) {
          setConnected(false);
        } else {
          console.error('[Frontend] Error al desconectar:', response?.error);
        }
      }
    } catch (error) {
      console.error('[Frontend] Error fatal en toggleSync:', error);
    } finally {
      setLoading(false); 
    }
  };

  return { isConnected, isLoading, toggleSync };
}