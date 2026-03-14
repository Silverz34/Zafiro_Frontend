'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'
import { syncUser } from '../lib/syncUser'

export function useSession() {
  const { isLoaded, isSignedIn } = useAuth()
  const hasSynced = useRef(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return

    hasSynced.current = true

    syncUser()
      .then((user) => {
        if (!user) {
          console.warn('[useSession] No se pudo sincronizar el usuario')
          return
        }
      })
      .catch((err) => {
        console.error('[useSession] Error en sync:', err)
        // Resetear para reintentar en el próximo render
        hasSynced.current = false
      })
  }, [isLoaded, isSignedIn])
}