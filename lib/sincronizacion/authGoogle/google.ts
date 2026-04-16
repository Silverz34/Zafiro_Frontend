'use server'

import { apiDelete, apiGet } from "../apiClient"

interface GoogleConnectionStatus {
  connected: boolean
  userId: string
  googleEmail?: string
  expiresAt?: string
  sync?: {
    calendarId: string
    lastSyncedAt?: string
    lastSuccessfulSyncAt?: string
    lastError?: string
  }
}

export async function initiateGoogle() {
  try {
    const response = await apiGet<{url: string; userId: string}>(
      '/api/integrations/google/connect'
    )
    
    console.log('[GOOGLE_CONNECT] Response:', response)

    if (response.success && response.data?.url) {
      return { success: true, url: response.data.url }
    }
    return { success: false, error: 'No se obtuvo URL de conexión' }
  } catch (error) {
    console.error('[GOOGLE_CONNECT] Error:', error)
    return { success: false, error: 'Error al iniciar conexión con Google' }
  }
}

//status de la conexion, no se para que sirve pero asi esta la endpoit 
export async function getGoogle(){
    try{
      const response = await apiGet<GoogleConnectionStatus>(
        '/api/integrations/google/status'
      )
      console.log('[GOOGLE_STATUS] Response:', response)
      return response.data
    }
    catch(error){
        console.error('[GOOGLE_STATUS] Error:', error)
        return null
    }
}


export async function disconnectGoogle() {
  try {
    //enpoit para desconectar con google
    const response = await apiDelete<GoogleConnectionStatus>('/api/integrations/google/disconnect')
    return { success: response.success, data: response.data }
  } catch (error) {
    console.error('[GOOGLE_DISCONNECT] Error:', error)
    return { success: false, error: 'Error al desconectar Google' }
  }
}