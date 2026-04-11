'use client'

import { XCircle } from "lucide-react"
import type { Agenda } from "../../../interfaces/Algorithm"
import Task from "../ui/algorithm-task"

interface UnscheduledTrayProps {
  tareas: Agenda[]
}

export default function UnscheduledTray({ tareas }: UnscheduledTrayProps) {
  if (!tareas || tareas.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-[#1e1d3a] flex flex-col gap-3">
      {/* Cabecera de la bandeja */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs font-bold text-[#AB3535] uppercase tracking-wider flex items-center gap-1.5">
          <XCircle className="w-4 h-4" />
          Sin espacio disponible ({tareas.length})
        </p>
        <p className="text-[10px] text-gray-500">
          Desliza para ver más
        </p>
      </div>
      
      {/* Carrusel horizontal */}
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-thin scrollbar-thumb-gray-800 px-1">
        {tareas.map(tarea => (
          <div key={tarea.id} className="min-w-50 max-w-55 shrink-0">
            <Task tarea={tarea} isScheduled={false} />
          </div>
        ))}
      </div>
    </div>
  )
}