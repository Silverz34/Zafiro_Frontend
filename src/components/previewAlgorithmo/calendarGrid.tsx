'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Agenda } from "../../../interfaces/Algorithm"
import { PRIORIDADES } from "../../../hooks/custom/modalconstantes"

interface AgendaCalendarGridProps {
  tareas: Agenda[]
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export default function AgendaCalendarGrid({ tareas }: AgendaCalendarGridProps) {

  const initialDate = useMemo(() => {
    if (tareas.length === 0) return new Date();
    const firstTaskDate = tareas[0].start.dateTime || tareas[0].start.date;
    return firstTaskDate ? new Date(firstTaskDate) : new Date();
  }, [tareas]);
  const [currentDate, setCurrentDate] = useState(initialDate);

  const daysToShow = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentDate]);

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 3);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 3);
    setCurrentDate(newDate);
  };

  // Filtrar tareas para un día específico
  const getTasksForDay = (date: Date) => {
    return tareas.filter(tarea => {
      const taskDate = tarea.start.dateTime || tarea.start.date;
      if (!taskDate) return false;
      const d = new Date(taskDate);
      return d.toDateString() === date.toDateString();
    });
  };

  // Calcular la posición Y (top) y el Alto (height) basándonos en la hora
  const getTaskStyle = (tarea: Agenda) => {
    if (!tarea.start.dateTime || !tarea.end.dateTime) return { top: 0, height: '64px' };
    
    const start = new Date(tarea.start.dateTime);
    const end = new Date(tarea.end.dateTime);
    
    const startMinutes = (start.getHours() * 60) + start.getMinutes();
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    const top = (startMinutes / 60) * 64;
    const height = Math.max((durationMinutes / 60) * 64, 24); 

    const tagColor = tarea.extras?.etiquetas?.color;
    const prioridadStr = tarea.extras?.prioridad;
    return { top: `${top}px`, height: `${height}px`};
  };

  if (!tareas || tareas.length === 0) return null;

  return (
    <div className="flex flex-col bg-[#0a0914] rounded-xl border border-[#1e1d3a] overflow-hidden">

      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1e1d3a] bg-[#0d0c1e]">
        <button onClick={handlePrev} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-gray-300">
          {daysToShow[0].toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })} - {daysToShow[2].toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <button onClick={handleNext} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* CABECERA DE LOS DÍAS */}
      <div className="flex border-b border-[#1e1d3a] bg-[#100F1D]">
        <div className="w-12 shrink-0 border-r border-[#1e1d3a]"></div>
        <div className="flex-1 grid grid-cols-3">
          {daysToShow.map((date, i) => (
            <div key={i} className="py-2 text-center border-r border-[#1e1d3a] last:border-r-0">
              <p className="text-[10px] text-gray-400 uppercase font-medium">{date.toLocaleDateString('es-MX', { weekday: 'short' })}</p>
              <p className="text-sm font-bold text-white mt-0.5">{date.getDate()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-75 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 relative">
        <div className="flex min-h-max relative">
          
          {/* COLUMNA DE HORAS */}
          <div className="w-12 shrink-0 border-r border-[#1e1d3a] bg-[#0a0914]">
            {HOURS.map(hour => (
              <div key={hour} className="h-16 border-b border-[#1e1d3a] flex justify-center py-1.5">
                <span className="text-[9px] text-gray-500 font-medium">
                  {hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour - 12}pm`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-3 relative">
            {daysToShow.map((date, dayIndex) => {
              const tareasDelDia = getTasksForDay(date);

              return (
                <div key={dayIndex} className="border-r border-[#1e1d3a] last:border-r-0 relative min-h-384">
                  {/* Líneas horizontales del grid */}
                  {HOURS.map(hour => (
                    <div key={`grid-${hour}`} className="h-16 border-b border-[#1e1d3a]/50"></div>
                  ))}

                  {/* Renderizado de Tareas con posicionamiento absoluto */}
                  {tareasDelDia.map(tarea => {
                    const style = getTaskStyle(tarea);
                    const tagColor = tarea.extras?.etiquetas?.color;
                    const prioridadObj = PRIORIDADES.find(p => p.nivel === tarea.extras?.prioridad);
                    const dynamicBarStyle = prioridadObj ? { backgroundColor: prioridadObj.hexColor } : (tagColor ? { backgroundColor: tagColor } : { backgroundColor: '#4b5563' });

                    return (
                      <div
                        key={tarea.id}
                        className="absolute left-1 right-1 border rounded-md p-1.5 overflow-hidden shadow-sm backdrop-blur-sm z-10 flex flex-col justify-between"
                        style={style}
                      >
                        <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">{tarea.summary}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  )
}