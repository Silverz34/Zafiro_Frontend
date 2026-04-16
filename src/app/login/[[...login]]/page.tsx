'use client'

import Image from 'next/image';
import { FondoHero } from '@/components/landing/Hero/fondo-hero';
import { SignIn, useAuth } from '@clerk/nextjs';
import Loading from '@/components/modal/loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Loginpage() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push('/calendar');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || userId) {
    return <Loading />;
  }

  return (
    <main className="relative min-h-screen w-full flex overflow-hidden bg-[#010112]">
      <div className="relative hidden lg:flex lg:w-1/2 flex-col items-center justify-center">
        <FondoHero />
        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <h1 className="text-6xl xl:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-white to-gray-400 drop-shadow-xl mb-4">
            ¡Bienvenido!
          </h1>
          <p className="text-gray-400 text-lg max-w-md font-medium">
            Organiza tu tiempo, optimiza tu día y toma el control con Zafiro.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#100F1D] lg:rounded-l-[2.5rem] border-l border-[#2554E0]/20 relative z-20">
        
        <div className="w-full max-w-md px-8 py-12 flex flex-col items-center">
          
          <div className="flex items-center justify-center mb-10">
            <Image 
              priority 
              src="/Logo_zafiro.png" 
              alt="Zafiro Logo" 
              width={300} 
              height={100} 
              className="h-14 w-auto drop-shadow-lg" 
            />
          </div>

          <SignIn
            appearance={{
              layout: {
                socialButtonsPlacement: "bottom", 
              },
              variables: {
                colorPrimary: '#2554E0', // Azul Zafiro
                colorBackground: 'transparent',
                colorText: '#F5F5F5',
                colorInputBackground: '#171733',
                colorInputText: '#F5F5F5',
                borderRadius: '0.75rem', 
              },
              elements: {
                rootBox: "!w-full",
                cardBox: "!w-full !shadow-none !bg-transparent",
                card: "!w-full !max-w-none !shadow-none !bg-transparent !p-0",
                main: "!w-full !flex !flex-col !gap-5",
                
                headerTitle: "!hidden",
                headerSubtitle: "!hidden",

                // Inputs
                formFieldLabel: "!text-gray-300 !text-sm !font-medium !mb-1.5",
                formFieldInput: "!bg-[#171733] !border-transparent focus:!border-[#2554E0] focus:!ring-1 focus:!ring-[#2554E0] !rounded-xl !py-3.5 !px-4 !transition-all !shadow-inner",
                
                // Botón Principal
                formButtonPrimary: "!bg-[#2554E0] hover:!bg-blue-600 !py-3.5 !rounded-xl !text-base !font-semibold !transition-all !shadow-lg !shadow-blue-900/30",
                
                // Botones Sociales (Google, etc)
                socialButtonsBlockButton: "!bg-[#171733] !border-gray-700/50 hover:!border-[#2554E0]/50 hover:!bg-[#1e1e40] !rounded-xl !py-3.5 !transition-all",
                socialButtonsBlockButtonText: "!text-gray-200 !font-medium",
                socialButtonsBlockButtonArrow: "!text-gray-400",

                dividerRow: "!my-2",
                dividerLine: "!bg-gray-700/50",
                dividerText: "!text-gray-400 !text-sm !font-medium",

                // Footer (Olvidaste tu contraseña, Registrarse)
                footerActionText: "!text-gray-400 !text-sm",
                footerActionLink: "!text-[#2554E0] hover:!text-blue-400 !text-sm !font-semibold !transition-colors",
                identityPreviewText: "!text-gray-300",
                identityPreviewEditButton: "!text-[#2554E0] hover:!text-blue-400",
              }
            }}
          />
        </div>
      </div>
    </main>
  );
}