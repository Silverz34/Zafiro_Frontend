'use server'

import { apiPost } from "../sincronizacion/apiClient";
import { SchemaEtiqueta } from "../../interfaces/Etiquetas";
import { ApiError } from "../sincronizacion/apiError";
import { EtiquetaFrontend } from "./getEtiqueta";

export async function createEtiqueta(datosFrontend: Omit<EtiquetaFrontend, 'id'>) {
    try {
        const payload = {
            nombre: datosFrontend.nombre,
            color: datosFrontend.color
        };
        const validated = SchemaEtiqueta.parse(payload);
        const response = await apiPost<{ id: string, nombre: string, color: string }>('/api/tags', validated);
        
        if (!response.success) {
            console.error('[createEtiqueta] Error en API:', response.message);
            return { success: false, error: response.message };
        }

        let mapData: EtiquetaFrontend | undefined;
        if (response.data) {
            mapData = {
                id: response.data.id,
                nombre: response.data.nombre,
                color: response.data.color
            };
        }

        return { success: response.success, data: mapData };
    } catch (error) {
        if (error instanceof ApiError) {
            console.error(`[createEtiqueta] Error ${error.status}:`, error.message);
            return { success: false, error: error.message };
        }
        console.error('[createEtiqueta] Error inesperado:', error);
        return { success: false, error: 'No se pudo crear la etiqueta' };
    }
}