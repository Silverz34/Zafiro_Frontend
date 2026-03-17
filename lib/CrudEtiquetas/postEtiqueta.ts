'use server'

import { apiPost } from "../api/apiClient";
import { SchemaEtiqueta } from "../../interfaces/Etiquetas";
import { ApiError } from "../api/apiError";

export type etiquetas ={
    id: string
    label: string
    color: string
};

export async function createEtiqueta(etiqueta: etiquetas) {
    try {
        const validated = SchemaEtiqueta.parse(etiqueta)
        const response = await apiPost<etiquetas>('/api/etiquetas', validated)
        if (!response.success) {
            console.error('[createEtiqueta] Error en API:', response.message)
            return { success: false, error: response.message }
        }
        return { success: response.success, data: response.data }
    } catch (error) {
        if (error instanceof ApiError) {
            console.error(`[createEtiqueta] Error ${error.status}:`, error.message)
            return { success: false, error: error.message }
        }
        console.error('[createEtiqueta] Error inesperado:', error)
        return { success: false, error: 'No se pudo crear la etiqueta' }
    }
}