'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-[#010112] text-[#F5F5F5] selection:bg-[#2554E0]/30">
      {/* Header Simple */}
      <nav className="fixed top-0 w-full z-50 bg-[#010112]/80 backdrop-blur-md border-b border-[#2554E0]/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/login" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Volver</span>
          </Link>
          <Image 
            src="/Logo_zafiro.png" 
            alt="Zafiro Logo" 
            width={120} 
            height={40} 
            className="h-8 w-auto"
          />
          <div className="w-20" /> 
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Términos de Servicio
          </h1>
          <p className="text-gray-400 font-medium">Última actualización: 16 de abril de 2026</p>
        </header>

        <div className="space-y-10 text-gray-300 leading-relaxed text-base md:text-lg">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              1. Naturaleza del Servicio
            </h2>
            <p>
              Zafiro es una plataforma avanzada de optimización personal diseñada para transformar 
              la gestión del tiempo de un modelo estático y rígido a uno dinámico y adaptativo. 
              El software actúa como un facilitador inteligente que armoniza variables de tiempo en entornos 
              laborales y académicos cambiantes, donde las demandas emergentes suelen derivar en frustración y
               pérdida de bienestar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              2. Propósito y Alcance
            </h2>
            <p>
              El propósito fundamental de Zafiro es ofrecer una estructura que proteja la disponibilidad del usuario 
              para sí mismo, garantizando que la productividad no sacrifique la salud mental ni el tiempo de 
              recuperación personal. En esencia, Zafiro no solo administra tareas; administra el equilibrio entre 
              la responsabilidad y la libertad del individuo mediante el procesamiento inteligente de actividades 
              y plazos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              3. Uso de la Tecnología y Sincronización
            </h2>
            <p>
              Zafiro utiliza algoritmos de vanguardia para la optimización de agenda. 
              Al utilizar el servicio, el usuario autoriza la sincronización con servicios de terceros 
              (como Google Calendar) para la lectura y escritura de eventos, necesaria para el funcionamiento
               del modelo adaptativo. El usuario mantiene en todo momento el control sobre la conexión y 
               desconexión de estos servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              4. Limitación de Responsabilidad
            </h2>
            <p>
              Zafiro es una herramienta de asistencia y apoyo a la toma de decisiones. 
              Aunque el algoritmo busca optimizar la carga de trabajo y reducir la fatiga de decisión, 
              la responsabilidad final sobre el cumplimiento de compromisos, citas y plazos recae exclusivamente 
              en el usuario. Zafiro no se hace responsable por imprevistos derivados de fallos en la conectividad 
              externa o interpretaciones del modelo algorítmico.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              5. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido, algoritmos, diseños y software relacionado con el Proyecto Zafiro son propiedad 
              exclusiva de sus desarrolladores. El usuario recibe una licencia limitada, no exclusiva y revocable 
              para utilizar la plataforma conforme a su propósito de gestión personal.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#100F1D] border border-[#2554E0]/20">
            <h2 className="text-lg font-bold text-white mb-3">Compromiso Zafiro</h2>
            <p className="text-sm text-gray-400">
              Reafirmamos nuestro compromiso de ser una herramienta que no solo organiza el tiempo, 
              sino que custodia la identidad y la privacidad de quienes confían en nuestra tecnología para 
              mejorar su calidad de vida. Para más información sobre el manejo de tus datos, consulta nuestra 
              <Link href="/privacidad" className="text-[#2554E0] hover:underline">Política de Privacidad</Link>.
            </p>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Proyecto Zafiro. Todos los derechos reservados.
        </footer>
      </article>
    </main>
  );
}