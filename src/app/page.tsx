import Link from "next/link";
import Image from "next/image";
import { FondoHero } from "@/components/landing/Hero/fondo-hero";
import { FeatureCard } from "@/components/landing/Card";
import {
  BrainCircuit,
  CalendarClock,
  Tags,
  Github,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MoveRight,
  Zap,
  CalendarDays,
  Clock4,
} from "lucide-react";

function ProblemCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl bg-[#0d0c1e]/80 border border-[#1e1d3a] hover:border-blue-600/40 transition-colors duration-300">
      <div className="w-11 h-11 rounded-xl bg-[#1a1836] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-bold text-white text-base mb-1">{title}</p>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
      {n}
    </span>
  );
}

function SemaphoreDay({
  color,
  label,
  events,
}: {
  color: "green" | "orange" | "red" | "normal";
  label: string;
  events: number;
}) {
  const bg = {
    green: "bg-[#2FA941]",
    orange: "bg-[#E2761F]",
    red: "bg-[#AB3535]",
    normal: "bg-[#171733]",
  }[color];

  const dot = {
    green: "bg-[#2FA941]",
    orange: "bg-[#E2761F]",
    red: "bg-[#AB3535]",
    normal: "bg-slate-500",
  }[color];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${bg}`}
      >
        {label}
      </div>
      <div className="flex flex-col gap-1 w-full">
        {Array.from({ length: events }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full opacity-70 ${dot}`}
            style={{ width: `${60 + Math.random() * 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#010112] text-white">
      {/* ── HEADER ── */}
      <header className="w-full py-4 px-8 flex justify-between items-center sticky top-0 z-50 bg-[#010112]/80 backdrop-blur-md border-b border-[#1e1d3a]">
        <Image
          src="/Logo_zafiro.png"
          alt="Zafiro Logo"
          width={500}
          height={500}
          className="h-9 w-auto"
          priority
        />
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Crear cuenta
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center w-full">
        {/* ── HERO ── */}
        <section className="relative w-full text-center py-36 px-6 overflow-hidden">
          <FondoHero />

          <h1 className="relative z-10 text-6xl md:text-7xl lg:text-8xl font-bold mb-5 tracking-tight font-nunito leading-none">
            Tu agenda,
            <br />
            <span className="text-blue-500">sugerente</span>
          </h1>

          <p className="relative z-10 text-lg md:text-xl text-slate-400 font-light mb-10 max-w-xl mx-auto leading-relaxed">
            Zafiro detecta cuándo estás saturado y reorganiza tus tareas
            en los huecos disponibles de tu semana
          </p>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50 hover:scale-[1.02]"
            >
              Empezar ahora
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-[#2554E0] text-white rounded-xl font-semibold hover:bg-white/5 transition-all"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-6 mb-28">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
              El problema
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Te suena familiar?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              La mayoría de las personas gestiona su agenda de la misma forma
              que hace 20 años: a mano, sin ayuda, con estrés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ProblemCard
              icon={<CalendarDays className="w-5 h-5 text-red-400" />}
              title="Todo acumulado en el mismo día"
              desc="Lunes con 6 tareas, jueves vacío. Tu semana nunca está balanceada y ni cuenta te das."
            />
            <ProblemCard
              icon={<Clock4 className="w-5 h-5 text-orange-400" />}
              title="Huecos libres que no aprovechas"
              desc="Tienes 2 horas libres el miércoles pero no sabes qué mover ahí. Terminas sin usarlos."
            />
            <ProblemCard
              icon={<CalendarClock className="w-5 h-5 text-yellow-400" />}
              title="Mover eventos uno por uno, a mano"
              desc="Un imprevisto rompe todo el plan y pasas 20 minutos reorganizando el calendario manualmente."
            />
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ── */}
        <section className="w-full max-w-6xl mx-auto px-6 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:p-12 rounded-2xl border border-blue-600/40 bg-[#0a0918]">
            <div className="space-y-8">
              <div>
                <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
                  Cómo funciona
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
                  Del caos al orden
                  <br />
                  <span className="text-blue-500">en 4 pasos.</span>
                </h2>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "Conecta tu Google Calendar",
                    desc: "Importa todos tus eventos existentes en segundos con OAuth seguro.",
                  },
                  {
                    title: "Marca tus tareas como libres",
                    desc: 'Las tareas flexibles se marcan como "libre". Las reuniones y clases se quedan fijas.',
                  },
                  {
                    title: "Ejecuta el algoritmo",
                    desc: "Configura tu horario de trabajo y Zafiro redistribuye todo automáticamente.",
                  },
                  {
                    title: "Aprueba o rechaza los cambios",
                    desc: "Previsualiza antes de aplicar. Si no convence, réintentalo con otros parámetros.",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <StepBadge n={i + 1} />
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-400 mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup del flujo del algoritmo */}
            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-500 text-center mb-1 uppercase tracking-widest">
                Vista previa de resultados
              </p>
              {/* Antes */}
              <div className="rounded-xl border border-[#1e1d3a] bg-[#0d0c1e] p-4">
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                  Antes — Martes sobrecargado
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { w: "100%", c: "#AB353533", b: "#AB3535", label: "Estudiar para examen" },
                    { w: "100%", c: "#E2761F33", b: "#E2761F", label: "Reunión de proyecto" },
                    { w: "80%",  c: "#AB353533", b: "#AB3535", label: "Entregar tarea" },
                    { w: "90%",  c: "#AB353533", b: "#AB3535", label: "Práctica de laboratorio" },
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="relative h-8 rounded-md px-2 flex items-center border text-xs font-medium text-white overflow-hidden"
                      style={{
                        backgroundColor: t.c,
                        borderColor: t.b,
                        width: t.w,
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-md"
                        style={{ backgroundColor: t.b }}
                      />
                      <span className="ml-2 truncate opacity-90">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-blue-400 text-xs font-semibold">
                <MoveRight className="w-5 h-5" />
                El algoritmo redistribuye
                <MoveRight className="w-5 h-5" />
              </div>

              {/* Después */}
              <div className="rounded-xl border border-[#2FA941]/30 bg-[#0d0c1e] p-4">
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FA941]" />
                  Después — Carga distribuida
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { day: "Lun", tasks: 1, color: "bg-[#2FA941]" },
                    { day: "Mar", tasks: 2, color: "bg-[#E2761F]" },
                    { day: "Mié", tasks: 1, color: "bg-[#2FA941]" },
                    { day: "Jue", tasks: 1, color: "bg-[#2FA941]" },
                  ].map((d) => (
                    <div key={d.day} className="flex flex-col items-center gap-1.5">
                      <div className={`w-8 h-8 rounded-full ${d.color} flex items-center justify-center text-xs font-bold text-white`}>
                        {d.day}
                      </div>
                      {Array.from({ length: d.tasks }).map((_, i) => (
                        <div
                          key={i}
                          className="h-2 w-full rounded-full bg-[#2FA941]/50"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEMÁFORO ── */}
        <section className="w-full max-w-6xl mx-auto px-6 mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mockup visual del semáforo */}
            <div className="rounded-2xl border border-[#1e1d3a] bg-[#0d0c1e] p-6 order-2 lg:order-1">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-5 text-center">
                Semana del 14 al 20 de abril
              </p>
              <div className="grid grid-cols-7 gap-2">
                {[
                  { label: "Lu", color: "green" as const, events: 1 },
                  { label: "Ma", color: "red" as const, events: 4 },
                  { label: "Mi", color: "normal" as const, events: 0 },
                  { label: "Ju", color: "orange" as const, events: 3 },
                  { label: "Vi", color: "green" as const, events: 2 },
                  { label: "Sa", color: "green" as const, events: 1 },
                  { label: "Do", color: "normal" as const, events: 0 },
                ].map((d) => (
                  <SemaphoreDay
                    key={d.label}
                    color={d.color}
                    label={d.label}
                    events={d.events}
                  />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2FA941]" />
                  Manejable
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E2761F]" />
                  Atención
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#AB3535]" />
                  Saturado
                </span>
              </div>
            </div>

            <div className="space-y-5 order-1 lg:order-2">
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                Semáforo de carga
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
                Detecta saturación{" "}
                <span className="text-blue-500">de un vistazo.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Cada día de tu calendario tiene un indicador de carga visual.
                No necesitas abrir cada día para saber si estás sobrepasado —
                el semáforo te lo dice de inmediato.
              </p>
              <div className="space-y-3">
                {[
                  {
                    color: "bg-[#2FA941]",
                    title: "Verde — Día manejable",
                    desc: "Tienes eventos pero la carga es sostenible.",
                  },
                  {
                    color: "bg-[#E2761F]",
                    title: "Naranja — Presta atención",
                    desc: "Varios eventos largos. Considera redistribuir algo.",
                  },
                  {
                    color: "bg-[#AB3535]",
                    title: "Rojo — Día saturado",
                    desc: "Demasiada carga. Es momento de ejecutar el algoritmo.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 shrink-0 ${item.color}`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="w-full max-w-6xl mx-auto px-6 mb-28">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Todo incluido
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Lo que Zafiro ofrece para ti
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<BrainCircuit className="w-6 h-6 text-blue-400" />}
              title="Algoritmo de optimización"
              desc="Redistribuye tus tareas libres respetando eventos fijos, tu horario de descanso y el tiempo de margen entre actividades."
            />
            <FeatureCard
              icon={<CalendarClock className="w-6 h-6 text-purple-400" />}
              title="Semáforo de carga"
              desc="Verde, naranja o rojo por día. Detecta de un vistazo qué días necesitan reorganización sin abrir cada uno."
            />
            <FeatureCard
              icon={<Tags className="w-6 h-6 text-yellow-400" />}
              title="Etiquetas y prioridades"
              desc="Clasifica por materia, proyecto o área de vida. Filtra lo que quieres ver y dale prioridad a lo realmente urgente."
            />
          </div>
        </section>
        
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-500 text-sm">
            <span>© {new Date().getFullYear()} Zafiro. Todos los derechos reservados.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <Link
              href="/privacidad"
              className="hover:text-white transition-colors duration-200"
            >
              Aviso de Privacidad
            </Link>
          </div>
          <a
            href="https://github.com/Silverz34/Zafiro_Frontend"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositorio de GitHub de Zafiro"
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors duration-200 text-sm"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}