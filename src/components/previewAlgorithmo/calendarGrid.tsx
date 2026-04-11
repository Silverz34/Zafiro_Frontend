'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Agenda } from "../../../interfaces/Algorithm"
import { useAgendaGrid, HOURS, formatearRango } from '../../../hooks/algoritm/useModalGrid';

interface AgendaCalendarGridProps {
  tareas: Agenda[]
}

export default function AgendaCalendarGrid({ tareas }: AgendaCalendarGridProps) {
  const { 
    daysToShow, handlePrev, handleNext, 
    getTasksForDay, getTaskStyle 
  } = useAgendaGrid(tareas);

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
                  {HOURS.map(hour => (
                    <div key={`grid-${hour}`} className="h-16 border-b border-[#1e1d3a]/50"></div>
                  ))}

                  {tareasDelDia.map(tarea => {
                    const { cardStyle, barStyle } = getTaskStyle(tarea);
                    
                    const timeString = (tarea.start.dateTime && tarea.end.dateTime)
                      ? formatearRango(tarea.start.dateTime, tarea.end.dateTime)
                      : '';

                    return (
                      <div
                        key={tarea.id}
                        className="absolute left-1 right-1 border rounded-md p-1.5 overflow-hidden shadow-sm backdrop-blur-sm z-10 flex flex-col justify-between"
                        style={cardStyle}
                      >
                        <div>
                          <p className="text-[11px] font-bold text-white line-clamp-1 leading-tight">{tarea.summary}</p>
                          {timeString && (
                            <p className="text-[9px] text-gray-300/90 mt-0.5 line-clamp-1">{timeString}</p>
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.75" style={barStyle} />
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