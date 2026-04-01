'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { syncUser } from '../../lib/sincronizacion/syncUser'

//
const MAX_RETRIES = 3
const RETRY_DELAY = 5000

export function useSession() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const retryCount = useRef(0)
  const isSyncing = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Asumimos que el componente está montado
    let isMounted = true; 

    if (!isLoaded || !isSignedIn || isSyncing.current) return

    isSyncing.current = true

    const attemptSync = async () => {
      const result = await syncUser()

      //Si el componente se desmontó mientras esperábamos, detenemos todo
      if (!isMounted) return;

      if (result) {
        setReady(true)
        return 
      }

      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1
        setTimeout(() => {
          // También verificamos aquí por si se desmontó durante la espera de 5 segundos
          if (isMounted) attemptSync()
        }, RETRY_DELAY)
        return 
      }

      router.replace('/login')
    }

    // Te faltaba llamar a la función en tu código original
    attemptSync();

    // Esta función se ejecuta automáticamente cuando el componente desaparece
    return () => {
      isMounted = false;
    }
  }, [isLoaded, isSignedIn, router])

  return { ready }
}