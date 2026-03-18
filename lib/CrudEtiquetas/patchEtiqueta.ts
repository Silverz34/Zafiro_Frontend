

import { apiPatch } from "../api/apiClient";
import { SchemaEtiqueta } from "../../interfaces/Etiquetas";

export async function updateEtiqueta(id: number, datosFrontend: { nombre: string; color: string }) {
  try {
    const payload = {
      nombre: datosFrontend.nombre,
      color: datosFrontend.color
    };
    const validated = SchemaEtiqueta.parse(payload);
    const response = await apiPatch(
      `/api/tags/${id}`,
      validated
    );

    if (response.success) {
      return { success: true };
    }
    return { success: false, error: 'No se pudo actualizar la etiqueta' };

  } catch (error) {
    console.error('[updateEtiqueta] Error:', error);
    return { success: false, error: 'Validación fallida o error de servidor' };
  }
}