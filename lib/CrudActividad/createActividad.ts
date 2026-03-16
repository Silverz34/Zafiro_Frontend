'use server';

import { apiPost } from "../api/apiClient";
import { ApiError } from "../api/apiError";
import { SchemaCrearActividad } from "../../interfaces/Actividad";
import { buildActivityPayload } from "../buildActivity"; { }
import { FormActividad } from "../../interfaces/types/FormActividad";

interface CreatedActivity {
  id: string
  summary: string
}

export async function createActividad(form: FormActividad) {
  try {
    const payload = buildActivityPayload(form)
    const validated = SchemaCrearActividad.parse(payload)

    const response = await apiPost<CreatedActivity>(
      '/api/activities',
      validated
    )

    if (!response.success) {
      console.error('[createActividad] Error en API:', response.message)
      return { success: false, error: response.message }
    }

    return { success: response.success, data: response.data }

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[createActividad] Error ${error.status}:`, error.message)
      return { success: false, error: error.message }
    }
    console.error('[createActividad] Error inesperado:', error)
    return { success: false, error: 'No se pudo crear la actividad' }
  }

}