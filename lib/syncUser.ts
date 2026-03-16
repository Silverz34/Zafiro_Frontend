'use server'

import { apiPost } from './apiClient'

export interface SyncResult {
  isNewUser: boolean
  nombre:    string
}

interface SessionData {
  isNewUser:   boolean
  nombre:      string
  correo:      string
  id:          string
  clerkUserId: string
}

export async function syncUser(): Promise<SyncResult | null> {
  try {
    const response = await apiPost<SessionData>('/api/auth/session', {})

    if (response.success && response.data) {
      console.log('[SYNC_USER] Usuario sincronizado:', response.data.id)
      return response.data
    }

    return null
  } catch (error) {
    console.error('[SYNC_USER] Error:', error)
    return null
  }
}