
import Image from 'next/image';
import Link from 'next/link';
import { FondoHero } from '../../../components/Hero/fondo-hero';
import { User, Mail, Lock} from 'lucide-react'; 

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen w-full flex overflow-hidden">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
            <FondoHero /> 
            <h1 className="relative z-10 text-white text-7xl font-bold tracking-tighter">
             ¡Bienvenido!
            </h1>
      </div>
        <div className="w-full lg:w-1/2 bg-[#100F1D] lg:rounded-l-[3rem] p-10 px-45">
          <div className="flex items-center justify-center gap-2 mb-6">
             <Image loading="eager" src="/Logo_zafiro.png" alt="Zafiro Logo" width={500} height={500} className="h-40 w-auto" />
          </div>
          <form className="space-y-5">
       
            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Nombre:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Mateo"
                  className="w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 pl-10
                   pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Apellidos:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  placeholder="Santa Ana"
                  className="w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 pl-10
                   pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Correo :</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input 
                  type="email" 
                  placeholder="santamateo@gmail.com"
                  className="w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 pl-10 pr-4
                   text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Contraseña:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input 
                  type="password" 
                  placeholder="skillEr12_#"
                  className="w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 pl-10 
                  pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
             <div className="space-y-2">
              <label className="text-gray-300 text-sm ml-1">Confirmar:</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input 
                  type="password" 
                  placeholder="skillEr12_#"
                  className="w-full bg-[#1e293b]/50 border border-blue-900/50 rounded-lg py-3 pl-10 
                  pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white 
            font-medium py-3 rounded-lg mt-4 transition-all shadow-lg shadow-blue-900/20">
              Registrar
            </button>

            <p className="text-center text-base text-gray-400 mt-4">
              ¿Ya tienes una cuenta? 
              <Link href="/login" className="px-2 text-base text-blue-600 transition-colors ">
                Login
              </Link>
            </p>
          </form>
        </div>
      
    </main>
  );
}