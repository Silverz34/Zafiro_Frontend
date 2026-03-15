'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { syncUser } from '../lib/syncUser'
import { useRouter } from 'next/navigation'


const MAX_RETRIES = 2 
const RETRY = 120
export function useSession() {
  const { isLoaded, isSignedIn } = useAuth()
  const Router = useRouter()
  const retryCount = useRef(0)
  const hasSynced = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || hasSynced.current) return

    hasSynced.current = true

    const attemptSync = async () => {
      const result = await syncUser()
     
      if (result) {
       setReady(true)
       return
      }
       
        if (retryCount.current < MAX_RETRIES) {
          retryCount.current += 1
          console.warn(
            `[useSession] Reintentando sync (${retryCount.current}/${MAX_RETRIES})...`
          )
          setTimeout(attemptSync, RETRY)
        return
      }
 
      // Agotamos reintentos. sesión inválida, redirigir al login
      // Esto cubre: token sin email, API caída, usuario no creado en BD
      console.error('[useSession] Sync fallido tras reintentos — redirigiendo al login')
      Router.replace('/login')
    }
 
  }, [isLoaded, isSignedIn])
  return { ready }
}