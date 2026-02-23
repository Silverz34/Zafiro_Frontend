'use client'
import { date } from "zod";
import { CalendarLogic } from "../../hooks/calendar"
import { GoogleEvent } from "../../interfaces/GEvent"
import { PiX } from "react-icons/pi";

interface CalendarProps{
    currentDate: Date;
    events : GoogleEvent[];
}

export default function CalendarGrid({currentDate, events}:CalendarProps){
    const {weekDay, hours, getProcessed} = CalendarLogic(currentDate, events);
    const dayNames= ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    return(
      <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border overflow-hidden text-white">
          <div className="flex border-b">
            <div className="w-16 border-r shirk-0 flex items-center justify-center text-xs text-white font-bold bg-blue-600">
                GMT
            </div>
            <div className="flex-1 grid grid-cols-7">
             {weekDay.map((date, index) =>(
               <div key={index} className="flex flex-col items-center justify-center py-3 border-r">   
               <span className="text-sm font-semibold text-white">{dayNames[index]}</span>
               <span className={`text-xl mt-1 w-8 h-8 flex items-center justify-center rounded-full ${
                date.toDateString() === new Date().toDateString() ? 'bg-blue-600 font-bold text-white' : 'text-gray-300'
                }`}> {date.getDate()}</span>       
               </div>
             ))}
            </div>
          </div>


          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-800 relative">
                <div className="flex min-h-max relative">
                    <div className="w-16 shirk-0 border-r bg-[#100F1D]">
                        {hours.map((hour)=>(
                            <div key={`hour-label-${hour}`} className="h-20 border-b flex justify-center py-2 text-xs text-white font-medium">
                                {hour === 0 ? '12 am' : hour < 12 ? `${hour} am` : hour === 12? '12 pm' : `${hour - 12}pm` }
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 grid grid-cols-7 relative">
                        {weekDay.map((date, dayIndex)=>{
                            const processedEvents = getProcessed(date);

                            return(
                                <div key={`day-col-${dayIndex}`} className="border-r min-h-80">
                                  {hours.map((hour)=>(
                                    <div key={`grid-line${hour}`} className="h-20 bordeer-b border-gray-800/300"></div>
                                  ))}
                                  

                                </div>
                            )
                        
                        
                        })}

                    </div>
                </div>
          </div>
      
      </div>

    )
}