
export default function CalendarLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">

      <div className="w-10 h-10 rounded-full border-2 border-[#1e1d3a] border-t-blue-500 animate-spin" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-sm font-medium text-gray-300">
          Cargando tus eventos...
        </p>
        <p className="text-xs text-gray-500">
          Conectando con Google Calendar
        </p>
      </div>

      <div className="flex flex-col gap-2 w-48 mt-2 opacity-30">
        {[80, 60, 72, 50].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded bg-blue-600/40 animate-pulse"
            style={{ width: `${w}%`, animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}