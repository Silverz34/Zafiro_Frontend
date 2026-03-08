'use client'
import { CalendarLogic } from "../../../hooks/calendar" 
import { GoogleEvent } from "../../../interfaces/Evento"

interface ViewProps {
    currentDate: Date;
    events: GoogleEvent[];
    onOpenModal: () => void;
}

export default function MonthView({ currentDate, events, onOpenModal}: ViewProps) {

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

                    return (
                        <div 
                            key={index} 
                            onClick={onOpenModal}
                            className={`border-r border-b border-gray-800 p-1 flex flex-col gap-1 min-h-25 hover:bg-gray-800/30 transition-colors cursor-pointer ${
                                !isCurrentMonth ? 'bg-[#0a0914] opacity-50' : ''
                            }`}
                        >
                            <div className="flex justify-center mb-1">
                                <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mt-1 ${
                                    isToday ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/50' : 'text-gray-300'
                                }`}>
                                    {date.getDate()}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1 overflow-y-auto max-h-full scrollbar-none pb-1">
                                {processedEvents.map(event => (
                                    <div 
                                        key={event.id} 
                                        className="bg-blue-600/20 border border-blue-500 text-blue-100 text-[10px] px-1.5 py-1 rounded truncate shadow-sm transition-all hover:bg-blue-600/40"
                                    >
                                        <span className="font-semibold mr-1">{event.formattedTime}</span> 
                                        {event.summary}
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