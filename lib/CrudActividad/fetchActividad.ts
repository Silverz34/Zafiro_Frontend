'use server'

import { apiGet } from '../sincronizacion/apiClient';
import { ApiError } from '../sincronizacion/apiError';
import { lecturaActividad } from '../../interfaces/Preview';

export async function fetchDailyActivities(
  timeMin: string,
  timeMax: string
): Promise<lecturaActividad[] | null> {
  try {
    const timestamp = Date.now();
    // Hacemos la petición a tu API de Google
    const response = await apiGet<lecturaActividad[]>(
      `/api/integrations/google/events?timeMin=${
        encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&_t=${timestamp}`
    );

    //no muestra nadaaaaaaa ahhhhhh
    console.log("Respuesta de Google:", JSON.stringify(response.data));

    if (!response.success) {
      console.error('[fetchDailyActivities] Respuesta fallida', response);
      return null;
    }
    
    if (Array.isArray(response.data)) {
      return response.data;
    }

    console.warn('[fetchDailyActivities] La API no devolvió un arreglo válido:', response.data);
    return [];

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[fetchDailyActivities] Error API ${error.status}:`, error.message);
    } else {
      console.error('[fetchDailyActivities] Error inesperado:', error);
    }
    return null;
  }
}