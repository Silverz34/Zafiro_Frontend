'use server'
import { apiPost } from "./apiClient";
import { Ajustes, SchemaAjustes } from "../../interfaces/ajustes";

export interface AjustesPayload{
    ocupacion: string;
    hora_inicio: string;
    hora_fin: string;
}
export async function saveAjustes(ajustes: AjustesPayload) {
    try {
        const validate = SchemaAjustes.parse(ajustes)
        const response = await apiPost<Ajustes>(`/api/users/me/settings`, validate) 
        console.log(response)
        if (response.success) {
            console.log('[SAVE_AJUSTES] Ajustes guardados correctamente')
            return true
        }
    
        console.error('[SAVE_AJUSTES] Error en la respuesta:', response.message)
        return false
    } catch (error) {
        console.error('[SAVE_AJUSTES] Error de red o servidor:', error)
        return false
    }
}