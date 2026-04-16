'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AvisoPrivacidad() {
  return (
    <main className="min-h-screen bg-[#010112] text-[#F5F5F5] selection:bg-[#2554E0]/30">
      
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
            priority
          />
          <div className="w-20" /> 
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Aviso de Privacidad
          </h1>
          <p className="text-gray-400 font-medium text-lg">
            Compromiso con la seguridad y protección de datos personales.
          </p>
          <div className="mt-4 text-sm text-gray-500">Última actualización: 16 de abril de 2026</div>
        </header>

        <div className="space-y-10 text-gray-300 leading-relaxed text-base md:text-lg">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              Nuestro Compromiso con tu Tranquilidad
            </h2>
            <p>
              En congruencia con nuestra misión de reducir la frustración del usuario, entendemos que la tranquilidad mental comienza con la seguridad de la información. Por ello, el software de Zafiro prioriza la privacidad del usuario y la integridad de sus datos en todo momento, reconociendo que la protección de la vida privada es fundamental para el bienestar personal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              Marco Legal y Protección de Datos
            </h2>
            <p>
              Bajo el amparo del <strong>Artículo 6, apartado A, fracción II</strong> y el <strong>Artículo 16</strong> de la Constitución Política de los Estados Unidos Mexicanos, garantizamos que toda información referente a la vida privada y los datos personales será protegida estrictamente. El acceso a estos datos solo podrá ser limitado por razones de seguridad nacional, salud o derechos de terceros, siempre bajo mandato de autoridad competente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              Derechos ARCO
            </h2>
            <p>
              De acuerdo con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (2010)</strong>, Zafiro garantiza el ejercicio pleno de los derechos <strong>ARCO</strong> (Acceso, Rectificación, Cancelación y Oposición). Implementamos mecanismos técnicos de vanguardia para asegurar que la información recolectada sea utilizada únicamente para los fines de gestión y optimización de agenda definidos por el usuario.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#171733]/50 border border-[#2554E0]/30 shadow-[0_0_30px_-10px_rgba(37,84,224,0.2)]">
            <h2 className="text-xl font-bold text-[#2554E0] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6" />
              Uso de Datos de Google API
            </h2>
            <p className="text-sm md:text-base text-gray-200">
              Zafiro utiliza las API de Google para sincronizar y optimizar tus eventos de Google Calendar. El uso de la información recibida de las API de Google por parte de Zafiro se ajustará a la <strong>Política de Datos del Usuario de los Servicios API de Google</strong>, incluidos los requisitos de <strong>Uso Limitado</strong>. 
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-200">
              No transferimos, vendemos ni utilizamos los datos de tu calendario para fines ajenos a la optimización de tu agenda dentro de nuestra plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2554E0] rounded-full"></span>
              Límites de Recolección
            </h2>
            <p>
              La recolección de datos se limitará a lo estrictamente necesario para el funcionamiento del algoritmo de Zafiro. Aseguramos que el uso de la información personal sea transparente durante los tiempos de tratamiento establecidos. Zafiro no solo organiza el tiempo, sino que custodia la identidad y la privacidad de quienes confían en nuestra tecnología para mejorar su calidad de vida.
            </p>
          </section>

        </div>

        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Proyecto Zafiro. Todos los derechos reservados conforme a las leyes vigentes de México.
        </footer>
      </article>
    </main>
  );
}