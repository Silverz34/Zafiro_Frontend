'use client'
import { GoogleEvent } from "../../../interfaces/Evento"

interface ViewProp{
    currentDate: Date;
    events: GoogleEvent[];
}

export default function MonthView({currentDate, events}: ViewProp){
    const dayNames= ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    const mockDay = Array.from({length: 35});
    return (
        <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">
            <div className="grid grid-cols-7 border-b border-gray-800 bg-[#0b0a14]">
                {dayNames.map((day, i) => (
                    <div key={i} className="py-2 text-center text-sm font-semibold text-gray-400 border-r border-gray-800 last:border-0">
                        {day}
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-7 grid-rows-5 auto-rows-fr">
                {mockDay.map((_, index) => (
                    <div key={index} className="border-r border-b border-gray-800 p-1 flex flex-col gap-1 min-h-25 hover:bg-gray-800/30 transition-colors cursor-pointer">
                        <span className="text-sm font-medium text-gray-300 ml-1 mt-1">
                            {index + 1}
                        </span>
                        <div className="flex flex-col gap-1 overflow-y-auto max-h-full scrollbar-none">
                            {index === 14 && (
                                <div className="bg-blue-600/30 border border-blue-500 text-blue-100 text-[10px] px-1.5 py-0.5 rounded truncate">
                                    10:00 - Estudiar
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}