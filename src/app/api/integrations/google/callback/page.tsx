'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // 1. Atrapamos el "code" que Google nos manda en la URL
    const code = searchParams.get('code');
    
    if (code) {
      console.log("¡Éxito! Código recibido de Google:", code);
    
      router.push('/calendar'); 
    } else {
      console.error("No se recibió código de Google");
      router.push('/calendar?error=google_sync_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#010112] flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <h2 className="text-xl font-semibold">Vinculando con Google Calendar...</h2>
      <p className="text-gray-400 text-sm mt-2">Por favor espera un momento, estamos guardando tu sesión.</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div className="bg-[#010112] min-h-screen" />}>
      <CallbackContent />
    </Suspense>
  );
}