import Link from "next/link";
import Image from "next/image";
import { FondoHero } from "../../components/Hero/fondo-hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans dark:bg-[var(--background)]">
      <header className="w-full py-5 px-8 flex justify-between items-center max-w-10xl mx-auto">
        <div className="flex items-center gap-2">
          <Image loading="eager" src="/Logo_zafiro.png" alt="Zafiro Logo" width={500} height={500} className="h-15 w-auto" />
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm hover:text-blue-400 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors">
            Register
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative w-full text-center py-20 overflow-hidden">
          <FondoHero />
          <h1 className="text-6xl md:text-7xl font-bold mb-4 tracking-tight font-nunito">
            ZAFIRO
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-8">
            Planea fácil, vive ligero
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20">
              Empezar Ahora 
            </button>
          </div>
        </section>




      </main>
    </div>
  );
}
