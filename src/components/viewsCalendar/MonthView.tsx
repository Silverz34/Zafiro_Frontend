'use client'
import { CalendarLogic } from "../../../hooks/calendar/calendar"
import type { ViewProps } from "../../../interfaces/types/props";
import { calcularSemaforo } from "../../../hooks/calendar/semaforo";
import { Repeat } from "lucide-react";

export default function MonthView({ currentDate, events, onOpenModal, onEventClick }: ViewProps) {

    const { days, getProcessed } = CalendarLogic(currentDate, events, 'mes');
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

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
                            <div className="flex flex-col gap-1 overflow-y-auto max-h-full scrollbar-none p-1">
                                {processedEvents.map(event => (
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
                                        className={`flex items-center gap-1 border text-[10px] px-1.5 py-1 rounded truncate shadow-sm transition-all ${event.isAllDay ? 'bg-blue-600/60 border-blue-400 text-white font-medium hover:bg-blue-600/80 mr-1 ml-1' : 'bg-blue-600/20 border-blue-500 text-blue-100 hover:bg-blue-600/40'}`}
                                    >
                                        {!event.isAllDay && <span className="font-semibold">{event.formattedTime}</span>}
                                        {event.recurringEventId && <Repeat className="w-2.5 h-2.5 shrink-0 opacity-70" />}
                                        <span className="truncate">{event.summary}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}