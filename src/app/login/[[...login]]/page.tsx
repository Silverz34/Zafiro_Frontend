import Image from 'next/image';
import { FondoHero } from '@/components/Hero/fondo-hero';
import { SignIn } from '@clerk/nextjs';

export default function Loginpage() {
  return (
    <main className="relative min-h-screen w-full flex overflow-hidden bg-[#010112]">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
            <FondoHero /> 
            <h1 className="relative z-10 text-white text-7xl font-bold tracking-tighter">
              ¡Bienvenido!
            </h1>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#100F1D] lg:rounded-l-[3rem]">
        <div className="py-30 px-50">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Image priority src="/Logo_zafiro.png" alt="Zafiro Logo" width={300} height={100} className="h-15 w-auto" />
         </div>
          <SignIn 
          appearance={{
            variables: {
              colorPrimary: '#2563eb',
              colorBackground: '#100F1D', 
              colorText: 'white', 
              colorInputBackground: 'rgba(30, 41, 59, 0.5)', 
              colorInputText: 'white',
              fontSize: '1.1rem', 
              spacingUnit: '1.2rem'
            },
            elements: {
              rootBox: "!w-full",
              cardBox: "!w-full !shadow-none !bg-transparent", 
              card: "!w-full !max-w-none !shadow-none !bg-transparent !p-0",
              main: "!w-full !flex !flex-col !gap-4",
            
              headerTitle: "!hidden",
              headerSubtitle: "!hidden",
 
              formFieldLabel: "!text-gray-300 !text-base !ml-1 !font-normal",
              formFieldInput: "!rounded-lg !py-3 !px-4 focus:!border-blue-500 !transition-colors",
              formButtonPrimary: "!py-3 !rounded-lg !mt-4 !text-base !normal-case !shadow-lg !shadow-blue-900/20",
              socialButtonsBlockButton: "!border-gray-600 hover:!bg-gray-800/50 !transition-all",
              socialButtonsBlockButtonText: "!text-white !font-normal",
              socialButtonsBlockButtonArrow: "!text-white",
              dividerLine: "!bg-gray-700",
              dividerText: "!text-gray-400",

              footerActionText: "!text-gray-400 !text-base",
              footerActionLink: "!text-blue-600 hover:!text-blue-500 !text-base !font-normal",
            }
          }}
          />
      </div>
      </div>
    </main>
  );
}