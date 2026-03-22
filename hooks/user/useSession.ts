'use client'

import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { syncUser } from '../../lib/api/syncUser'

const MAX_RETRIES = 3
const RETRY_DELAY = 1500

export function useSession() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const retryCount = useRef(0)
  const isSyncing = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || isSyncing.current) return

    isSyncing.current = true

    const attemptSync = async () => {
      const result = await syncUser()

      if (result) {
        setReady(true)
        return
      }

      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1
        setTimeout(attemptSync, RETRY_DELAY)
        return
      }

      router.replace('/login')
    }

    attemptSync()
  }, [isLoaded, isSignedIn, router])

  return { ready }
}