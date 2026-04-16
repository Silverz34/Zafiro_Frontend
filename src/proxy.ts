import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/register(.*)',
  '/privacidad',
  '/servicios'
])

const onboardingRoutes = createRouteMatcher(['/onboarding'])
export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  if (userId){
    const onboardingComplete = sessionClaims?.metadata?.onboardingCompleto === true
    const catching = onboardingRoutes(req)
    if (!onboardingComplete && !catching && !isPublicRoute(req)) {
      const onboardingUrl = new URL('/onboarding', req.url)
      return NextResponse.redirect(onboardingUrl)
    }
    if (onboardingComplete && catching) {
      const dashboardUrl = new URL('/calendar', req.url) 
      return NextResponse.redirect(dashboardUrl)
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}