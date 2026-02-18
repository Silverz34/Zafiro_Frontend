import Link from "next/link";
import Image from "next/image";
import { FondoHero } from "@/components/Hero/fondo-hero";
import {FeatureCard} from "@/components/Card"
import { BrainCircuit, CalendarClock, BarChart3, Tags, Search, Scale, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans dark:bg-background">

      <header className="w-full py-5 px-8 flex justify-between items-center max-w-10xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/Logo_zafiro.png" alt="Zafiro Logo" width={500} height={500} className="h-10 w-auto" />
        </div>
        <div className="flex gap-4 ">
          <Link href="/login" className="px-4 py-2 text-sm hover:text-blue-400 transition-colors ">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm border border-blue-600 rounded-lg hover:bg-slate-800 transition-colors">
            Registrar
          </Link>
        </div>
      </header>

      <main className="grow flex flex-col items-center w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full text-center py-20 overflow-hidden">
          <FondoHero />
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight font-nunito z-1">
            ZAFIRO
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-8 z-1">
            Planea fácil, vive ligero
          </p>
          <div className="flex gap-4 justify-center">
            <Link href={'/login'} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 z-1">
              Empezar Ahora 
            </Link>
          </div>
        </section>

        <section className="w-full md:h-100 bg-linear-to-r from-blue-600 rounded-2xl shadow-2xl mb-24 relative overflow-hidden group">
          <div className="justify-center text-center">
            <h1>Aun no se que colocar aqui, tal vez una frase chida</h1>
          </div>
        </section>

        <section className="w-full mb-24">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-blue-500 mb-2">Soluciones</h2>
            <h3 className="text-2xl font-bold text-white">Lo que zafiro ofrece para ti</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<BrainCircuit className="w-6 h-6 text-blue-400" />}
              title="Sugerencias Inteligentes"
              desc="Nuestro algoritmo detecta saturación y sugiere los mejores horarios disponibles automáticamente."
            />
            <FeatureCard 
              icon={<CalendarClock className="w-6 h-6 text-purple-400" />}
              title="Re-agendado Dinámico"
              desc="¿Imprevistos? No borres ni muevas manualmente. Zafiro recalcula tu agenda al instante."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-emerald-400" />}
              title="Visualizador de Densidad"
              desc="Detecta qué días están saturados con nuestro semáforo de carga laboral."
            />
            <FeatureCard 
              icon={<Tags className="w-6 h-6 text-yellow-400" />}
              title="Etiquetas de Prioridad"
              desc="Clasifica tareas (escuela, trabajo, personal) para enfocarte en lo urgente."
            />
            <FeatureCard 
              icon={<Search className="w-6 h-6 text-pink-400" />}
              title="Detector de Huecos"
              desc="Encontramos esos pequeños espacios libres para optimizar tu productividad."
            />
            <FeatureCard 
              icon={<Scale className="w-6 h-6 text-orange-400" />}
              title="Carga Equilibrada"
              desc="Si un día pesa mucho, te sugerimos distribuir tareas a días más ligeros."
            />
          </div>
        </section>

      </main>

      <footer className="w-full border-t border-slate-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
          </div>
          <a href="https://github.com/Silverz34/Zafiro_Frontend" className="flex gap-6">
            <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer" />
          </a>
        </div>
      </footer>

    </div>
  );
}
