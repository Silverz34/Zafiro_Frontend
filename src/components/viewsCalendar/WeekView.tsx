'use client'
import { CalendarLogic } from "../../../hooks/calendar/calendar"
import type { ViewProps } from "../../../interfaces/types/props";
import { PRIORIDADES } from "../../../hooks/custom/modalconstantes";
import { calcularSemaforo } from "../../../hooks/calendar/semaforo";
import { Repeat } from "lucide-react";
import { useEtiquetasCtx } from "@/context/EtiquetaContext";
import CalendarLoader from "./CalendarLoader"; 


export default function WeekView({ currentDate, events, onOpenModal, onEventClick, isLoading }: ViewProps) {
  const { days, hours, getProcessed } = CalendarLogic(currentDate, events, 'semana');
  const { etiquetas } = useEtiquetasCtx();
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">
      <div className="flex border-b border-gray-800">
        <div className="w-16 border-r border-gray-800 shrink-0 flex items-center justify-center text-xs text-white font-bold bg-blue-600">
          GMT
        </div>
       <div className="flex-1 grid grid-cols-7">
          {days.map((date, index) => {
            const eventosDelDia = getProcessed(date);
            const colorSemaforo = calcularSemaforo(eventosDelDia);
            const bgClass = 
              colorSemaforo === 'rojo' ? 'bg-[#AB3535] border-r border-[#8A2525]' :
              colorSemaforo === 'naranja' ? 'bg-[#E2761F] border-r border-[#C16215]' :
              colorSemaforo === 'verde' ? 'bg-[#2FA941] border-r border-[#228531]' :
              'border-r border-gray-800';
            const isToday = date.toDateString() === new Date().toDateString();
            return (
              <div 
                key={index} 
                className={`flex flex-col items-center justify-center py-2 transition-colors duration-300 ${bgClass}`}
              >
                <span className="text-sm font-semibold text-white">{dayNames[index]}</span>
                <span className={`text-xl mt-1 w-8 h-8 flex items-center justify-center rounded-full ${
                  isToday 
                    ? (colorSemaforo === 'normal' ? 'bg-blue-600 font-bold text-white' : 'bg-white/25 font-bold text-white') 
                    : 'text-gray-100'
                }`}> 
                  {date.getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      { isLoading ? (
        <CalendarLoader />                      
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 relative">
          <div className="flex min-h-max relative">
            <div className="w-16 shrink-0 border-r border-gray-800 bg-[#100F1D]">
              {hours.map((hour) => (
                <div key={`hour-label-${hour}`} className="h-16 border-b border-gray-800 flex justify-center py-2 text-xs text-white font-medium">
                  {hour === 0 ? '12 am' : hour < 12 ? `${hour} am` : hour === 12 ? '12 pm' : `${hour - 12} pm`}
                </div>
              ))}
            </div>

            <div className="flex-1 grid grid-cols-7 relative" onClick={onOpenModal}>
              {days.map((date, dayIndex) => {
                const processedEvents = getProcessed(date);

                return (
                  <div key={`day-col-${dayIndex}`} className="border-r border-gray-800 relative min-h-80 ">
                    {hours.map((hour) => (
                      <div key={`grid-line${hour}`} className="h-16 border-b border-gray-800/30"></div>
                    ))}

                    {processedEvents.map(event => {
                      const tag = etiquetas.find((e) => e.id === (event as any).idEtiqueta);
                      const dynamicCardStyle = tag ? { backgroundColor: `${tag.color}33`, borderColor: tag.color } : {};

                      const prioridadStr = (event as any).prioridad?.valor || (event as any).prioridadValor;
                      const prioridadObj = PRIORIDADES.find(p => p.nivel === prioridadStr);
                      const dynamicBarStyle = prioridadObj ? { backgroundColor: prioridadObj.hexColor } : (tag ? { backgroundColor: tag.color } : {});

                      return (
                        <div
                          key={event.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!event.id) return;
                            const eventoOriginal = events.find((orig) => orig.id === event.id);
                            if (eventoOriginal) {
                              onEventClick(eventoOriginal);
                            }
                          }}

                        className={`absolute left-1 right-1 border rounded-md p-1.5 
                          overflow-hidden shadow-sm backdrop-blur-sm transition-all z-10 flex flex-col justify-between ${event.isAllDay ? 'bg-blue-600/40 border-blue-400' : 'bg-blue-600/20 border-blue-500 hover:bg-blue-600/30'}`} style={{ ...event.positionStyle, ...dynamicCardStyle }}>
                        <div>
                          <div className="flex items-center gap-1">
                            {event.recurringEventId && <Repeat className="w-2.5 h-2.5 text-blue-200 shrink-0" />}
                            <p className="text-[14px] font-bold text-blue-100 line-clamp-1">{event.summary}</p>
                          </div>
                          {event.transparency == 'opaque' && (
                            <p className="text-[11px] font-medium text-gray-200">Ocupado</p>
                          )}
                          <p className="text-[10px] text-blue-300 mt-0.5">{event.formattedTime} - {event.endTime}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600" style={dynamicBarStyle}/>
                      </div>
                    );
                  })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}