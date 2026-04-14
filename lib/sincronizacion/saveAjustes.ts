'use server'
import { apiPost } from "./apiClient";
import { Ajustes, SchemaAjustes } from "../../interfaces/ajustes";
import { auth, clerkClient } from '@clerk/nextjs/server';
import { syncUser } from "./syncUser";

export interface AjustesPayload{
    ocupacion: string;
    hora_inicio: string;
    hora_fin: string;
}
export async function saveAjustes(ajustes: AjustesPayload) {
   try {
    
        const session = await syncUser();
        if (!session) {
        console.error('[SAVE_AJUSTES] No se pudo sincronizar el usuario');
        return false;
        }

        const validate = SchemaAjustes.parse(ajustes)
        const response = await apiPost<Ajustes>(`/api/users/me/settings`, validate) 
        console.log(response)
        
        if (response.success) {
            console.log('[SAVE_AJUSTES] Ajustes guardados correctamente en BD');

            //validacion del metadata para el onboarding,para evitar estar atrapados en page de onboarding 
            const { userId } = await auth();
            if (userId) {
                const client = await clerkClient();
                await client.users.updateUserMetadata(userId, {
                    publicMetadata: {
                        onboardingCompleto: true
                    }
                });
                console.log('[SAVE_AJUSTES] Metadatos de Clerk actualizados');
            }
            return true
        }
    
        console.error('[SAVE_AJUSTES] Error en la respuesta:', response.message)
        return false
    } catch (error) {
        console.error('[SAVE_AJUSTES] Error de red o servidor:', error)
        return false
    }
}