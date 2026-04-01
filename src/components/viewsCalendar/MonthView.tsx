'use client'
import { CalendarLogic } from "../../../hooks/calendar/calendar"
import type { ViewProps } from "../../../interfaces/types/props";
import { calcularSemaforo } from "../../../hooks/calendar/semaforo";
import { useEtiquetas } from "../../../hooks/user/useEtiquetas";
import { PRIORIDADES } from "../../../hooks/custom/modalconstantes";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function MonthView({ currentDate, events, onOpenModal, onEventClick }: ViewProps) {

    const { days, getProcessed } = CalendarLogic(currentDate, events, 'mes');
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const { etiquetas } = useEtiquetas();

    // Función auxiliar para calcular los estilos dinámicos de un evento
    const getEventStyles = (event: any) => {
        const tag = etiquetas.find((e) => e.id === event.idEtiqueta);
        const dynamicCardStyle = tag 
            ? { backgroundColor: `${tag.color}33`, borderColor: tag.color, color: tag.color } 
            : { backgroundColor: 'rgba(37, 99, 235, 0.2)', borderColor: '#3b82f6', color: '#dbeafe' };
        
        const prioridadStr = event.prioridad?.valor || event.prioridadValor;
        const prioridadObj = PRIORIDADES.find(p => p.nivel === prioridadStr);
        const dynamicBarStyle = prioridadObj 
            ? { backgroundColor: prioridadObj.hexColor } 
            : (tag ? { backgroundColor: tag.color } : { backgroundColor: '#2563eb' });

        return { dynamicCardStyle, dynamicBarStyle };
    };

    return (
        <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">

            <div className="grid grid-cols-7 border-b border-gray-800 bg-[#0b0a14]">
                {dayNames.map((day, i) => (
                    <div key={i} className="py-2 text-center text-sm font-semibold text-gray-400 border-r border-gray-800 last:border-0">
                        {day}
                    </div>
                ))}
            </div>
            
            <div className="flex-1 grid grid-cols-7 grid-rows-6 auto-rows-fr">
                {days.map((date, index) => {
                    const processedEvents = getProcessed(date);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const colorSemaforo = calcularSemaforo(processedEvents);
                    const headerClass = 
                      colorSemaforo === 'rojo' ? 'bg-[#AB3535] text-white border-b border-[#8A2525]' :
                      colorSemaforo === 'naranja' ? 'bg-[#E2761F] text-white border-b border-[#C16215]' :
                      colorSemaforo === 'verde' ? 'bg-[#2FA941] text-white border-b border-[#228531]' :
                      'bg-transparent text-gray-300'; 

                    const eventosVisibles = processedEvents.slice(0, 2);
                    const cantidadSobrantes = processedEvents.length - 2;

                    return (
                        <div
                            key={index}
                            onClick={onOpenModal}
                            className={`border-r border-b border-gray-800 flex flex-col min-h-25 hover:bg-gray-800/30 transition-colors cursor-pointer ${
                                !isCurrentMonth ? 'bg-[#0a0914] opacity-50' : ''
                            }`}
                        >
                            <div className={`flex justify-center py-1 transition-colors duration-300 ${headerClass}`}>
                                <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                                    isToday 
                                        ? (colorSemaforo === 'normal' ? 'bg-blue-600 font-bold text-white shadow-md shadow-blue-900/50' : 'bg-white/30 font-bold text-white') 
                                        : 'font-medium'
                                    }`}>
                                    {date.getDate()}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-1 overflow-hidden flex-1 p-1">
                                
                                {eventosVisibles.map(event => {
                                    const { dynamicCardStyle, dynamicBarStyle } = getEventStyles(event);
                                    
                                    return (
                                        <div
                                            key={event.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!event.id) return;
                                                const eventoOriginal = events.find((orig) => orig.id === event.id);
                                                if (eventoOriginal) onEventClick(eventoOriginal);
                                            }}
                                            className="relative overflow-hidden border text-[10px] px-1.5 py-1 rounded shadow-sm transition-all hover:opacity-80"
                                            style={dynamicCardStyle}
                                        >
                                            <div className="truncate mb-0.5">
                                                <span className="font-bold mr-1 text-white">{event.formattedTime}</span>
                                                <span className="font-medium text-white">{event.summary}</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 h-[2.5px]" style={dynamicBarStyle}/>
                                        </div>
                                    );
                                })}

                                {cantidadSobrantes > 0 && (
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button 
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[10px] font-medium text-gray-400 hover:text-white text-left px-1 py-0.5 mt-auto rounded hover:bg-gray-800 transition-colors"
                                            >
                                                + {cantidadSobrantes} más
                                            </button>
                                        </PopoverTrigger>
                                        
                                        <PopoverContent 
                                            className="w-56 p-2 bg-[#0f172a] border border-gray-700 shadow-xl rounded-xl z-50"
                                            side="right" 
                                            align="start"
                                        >
                                            <div className="text-xs text-center font-bold text-gray-300 border-b border-gray-700 pb-2 mb-2">
                                                {date.toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                                            </div>
                                            
                                            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 pr-1">
                                                
                                                {processedEvents.map(event => {
                                                    const { dynamicCardStyle, dynamicBarStyle } = getEventStyles(event);
                                                    
                                                    return (
                                                        <div
                                                            key={`popover-${event.id}`}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (!event.id) return;
                                                                const eventoOriginal = events.find((orig) => orig.id === event.id);
                                                                if (eventoOriginal) onEventClick(eventoOriginal);
                                                            }}
                                                            className="relative overflow-hidden border text-[11px] px-2 py-1.5 rounded cursor-pointer shadow-sm transition-all hover:opacity-80"
                                                            style={dynamicCardStyle}
                                                        >
                                                            <span className="font-bold mr-1 block mb-0.5 text-white">{event.formattedTime}</span>
                                                            <span className="truncate block font-medium mb-0.5 text-white">{event.summary}</span>
                                                            <div className="absolute bottom-0 left-0 right-0 h-0.75" style={dynamicBarStyle}/>
                                                        </div>
                                                    );
                                                })}

                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}