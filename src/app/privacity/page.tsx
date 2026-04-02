import React from 'react';

export default function AvisoPrivacidad() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal con sombra y fondo blanco para resaltar el texto */}
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-lg border border-gray-100">
        
        {/* Encabezado del documento */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Aviso de Privacidad y Manejo de Datos
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Última actualización: Abril de 2026
          </p>
        </div>

        {/* Contenido dividido en secciones semánticas */}
        <div className="space-y-8 text-gray-700">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Nuestro Compromiso con tu Tranquilidad
            </h2>
            <p className="leading-relaxed">
              En congruencia con nuestra misión de reducir la frustración del usuario, entendemos que la tranquilidad mental comienza con la seguridad de la información. Por ello, el software de Zafiro prioriza la privacidad del usuario y la integridad de sus datos en todo momento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Marco Legal y Protección de Datos
            </h2>
            <p className="leading-relaxed">
              Bajo el amparo del Artículo 6, apartado A, fracción II de la Constitución Política de los Estados Unidos Mexicanos, garantizamos que toda información referente a la vida privada y los datos personales será protegida estrictamente en los términos de uso aquí descritos. Asimismo, y en cumplimiento con el Artículo 16, segundo párrafo constitucional, Zafiro establece una garantía robusta de protección de datos, facultando al usuario para que mantenga el control total sobre su información. El acceso a estos datos personales solo podrá ser limitado o intervenido por razones de seguridad nacional, seguridad pública, salud o por derechos de terceros, siempre bajo el mandato de la autoridad competente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Derechos ARCO
            </h2>
            <p className="leading-relaxed">
              De estricto acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (2010), el Proyecto Zafiro garantiza el ejercicio pleno de los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) para todos sus usuarios reales. En cumplimiento con los Artículos 15 y 16 de dicha Ley, el software integra este Aviso de Privacidad y mecanismos técnicos de vanguardia para asegurar que la información recolectada sea utilizada únicamente para los fines de gestión y optimización de agenda definidos por el usuario.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Límites de Recolección
            </h2>
            <p className="leading-relaxed">
              La recolección de datos se limitará a lo estrictamente necesario para el funcionamiento del algoritmo de Zafiro, asegurando que el uso de la información personal sea transparente y seguro durante los tiempos de tratamiento establecidos por el equipo de desarrollo. Con esto, Zafiro reafirma su compromiso de ser una herramienta que no solo organiza el tiempo, sino que custodia la identidad y la privacidad de quienes confían en nuestra tecnología para mejorar su calidad de vida.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}