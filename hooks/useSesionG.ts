import { useState, useEffect, use } from "react";
import { initiateGoogle, getGoogle, disconnectGoogle } from "../lib/api/authGoogle/google";

export function useGoogleSync(){
 
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
    setLoading(true);
    
    if (!checked) {
      const response = await disconnectGoogle();
      if (response?.success) {
        setConnected(false);
      } else {
        console.error('Fallo al desconectar de Google');
      }
      setLoading(false);
    } else {
      const response = await initiateGoogle();
      if (response?.success && response.url) {
        window.location.href = response.url;
      } else {
        console.error('Fallo al obtener la url de Google', response?.error);
        setLoading(false);
      }
    }
  };

  return { isConnected, isLoading, toggleSync };
}