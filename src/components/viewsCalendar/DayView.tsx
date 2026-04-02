'use client'
import { CalendarLogic } from "../../../hooks/calendar/calendar"
import type { ViewProps } from "../../../interfaces/types/props";
import { useEtiquetas } from "../../../hooks/user/useEtiquetas";
import { PRIORIDADES } from "../../../hooks/custom/modalconstantes";
import { calcularSemaforo } from "../../../hooks/calendar/semaforo";
import { Repeat } from "lucide-react";
import { useEtiquetasCtx } from "@/context/EtiquetaContext";


export default function DayView({ currentDate, events, onOpenModal, onEventClick }: ViewProps) {
    const { days, hours, getProcessed } = CalendarLogic(currentDate, events, 'dia');
    const { etiquetas } = useEtiquetasCtx();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const targetDate = days[0] || currentDate;
    const processedEvents = getProcessed(targetDate);
    const dayName = dayNames[targetDate.getDay()];
    const colorSemaforo = calcularSemaforo(processedEvents);
   
    const bgClass = 
      colorSemaforo === 'rojo' ? 'bg-[#AB3535] border-b border-[#8A2525]' :
      colorSemaforo === 'naranja' ? 'bg-[#E2761F] border-b border-[#C16215]' :
      colorSemaforo === 'verde' ? 'bg-[#2FA941] border-b border-[#228531]' :
      'bg-[#0b0a14] border-b border-gray-800';

    return (
        <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">

            <div className="flex border-b border-gray-800 bg-[#0b0a14]">
                <div className="w-16 border-r border-gray-800 shrink-0 flex items-center justify-center text-xs font-bold bg-blue-600">
                    GMT
                </div>

                <div className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors duration-300 ${bgClass}`}>
                    <span className="text-lg font-semibold text-gray-300 tracking-wider">{dayName}</span>
                    <span className={`text-2xl mt-1 w-10 h-10 flex items-center justify-center rounded-full ${
                        targetDate.toDateString() === new Date().toDateString() 
                            ? (colorSemaforo === 'normal' ? 'bg-blue-600 font-bold text-white shadow-lg shadow-blue-900/50' : 'bg-white/25 font-bold text-white') 
                            : 'text-gray-100'
                        }`}>
                        {targetDate.getDate()}
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 relative">
                <div className="flex min-h-max relative">
                    <div className="w-16 shrink-0 border-r border-gray-800 bg-[#100F1D]">
                        {hours.map((hour) => (
                            <div key={`hour-label-${hour}`} className="h-16 border-b border-gray-800 flex justify-center py-2 text-xs font-medium text-gray-400">
                                {hour === 0 ? '12 am' : hour < 12 ? `${hour} am` : hour === 12 ? '12 pm' : `${hour - 12} pm`}
                            </div>
                        ))}
                    </div>
                    <div onClick={onOpenModal} className="flex-1 relative min-h-80">
                        {hours.map((hour) => (
                            <div key={`grid-line${hour}`} className="h-16 border-b border-gray-800/30"></div>
                        ))}
                        {processedEvents.map(event => {
                            const tag = etiquetas.find((e) => e.id === (event as any).idEtiqueta);
                            const prioridadStr = (event as any).prioridad?.valor || (event as any).prioridadValor;
                            const prioridadObj = PRIORIDADES.find(p => p.nivel === prioridadStr);

                            const bgStyle = tag ? { backgroundColor: `${tag.color}33` } : {};
                            const borderStyle = prioridadObj ? { borderLeftColor: prioridadObj.hexColor } : {};
                            const dynamicCardStyle = { ...event.positionStyle, ...bgStyle, ...borderStyle };

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
                                className={`absolute left-2 right-4 border-l-4 rounded-r-md p-2 overflow-hidden shadow-sm backdrop-blur-sm transition-all z-10 flex flex-col ${event.isAllDay ? 'bg-blue-600/40 border-blue-400' : 'bg-blue-600/20 border-blue-500 hover:bg-blue-600/30'}`}
                                style={dynamicCardStyle}
                            >
                                <div className="flex items-center gap-1">
                                    {event.recurringEventId && <Repeat className="w-3 h-3 text-blue-200" />}
                                    <p className="text-sm font-bold text-blue-100">{event.summary}</p>
                                </div>
                                <p className="text-xs text-blue-300 mt-1 font-medium">{event.formattedTime}</p>
                            </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
}