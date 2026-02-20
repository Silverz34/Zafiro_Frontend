import Image from 'next/image';
import { FondoHero } from '@/components/Hero/fondo-hero';
import { SignIn } from '@clerk/nextjs';

export default function Loginpage() {
  return (
    <main className="relative min-h-screen w-full flex overflow-hidden bg-[#100F1D]">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
            <FondoHero /> 
            <h1 className="relative z-10 text-white text-7xl font-bold tracking-tighter">
              ¡Bienvenido!
            </h1>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24">
        <div className="flex items-center justify-center gap-2 mb-8">
            <Image priority src="/Logo_zafiro.png" alt="Zafiro Logo" width={300} height={100} className="h-15 w-auto" />
        </div>
        <div className="w-full max-w-md">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full p-0",
                headerTitle: "hidden", 
                headerSubtitle: "hidden", 
                formFieldLabel: "text-gray-300 text-base ml-1 font-normal",
                formFieldInput: "w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors",
                formButtonPrimary: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg mt-4 transition-all shadow-lg shadow-blue-900/20 text-base normal-case",
                
                // Textos del footer ("¿No tienes cuenta? Regístrate")
                footerActionText: "text-gray-400 text-base",
                footerActionLink: "text-blue-600 hover:text-blue-500 text-base font-normal",
                formFieldErrorText: "text-red-400 mt-1",
              }
            }}
          />
        </div>

      </div>
    </main>
  );
}