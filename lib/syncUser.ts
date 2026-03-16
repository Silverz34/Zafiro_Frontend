'use server'

import { apiPost } from './apiClient'
import { ApiError } from './apiError'

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

    if (!response.success || !response.data) return null

    const { isNewUser, nombre } = response.data
    return { isNewUser, nombre }

  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[syncUser] Error ${error.status}:`, error.message)
    }
    return null
  }
}