'use calendar'
import { CalendarLogic } from "../../../hooks/calendar"
import { GoogleEvent } from "../../../interfaces/Evento"

interface ViewProp{
    currentDate: Date;
    events: GoogleEvent[]; 
}

export default function WeekView ({currentDate, events }:ViewProp){
    const {weekDay, hours, getProcessed} = CalendarLogic(currentDate, events);
    const dayNames= ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

    return(
      <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">
          <div className="flex border-b border-gray-800">
            <div className="w-16 border-r border-gray-800 shrink-0 flex items-center justify-center text-xs text-white font-bold bg-blue-600">
                GMT
            </div>
            <div className="flex-1 grid grid-cols-7">
             {weekDay.map((date, index) =>(
               <div key={index} className="flex flex-col items-center justify-center py-3 border-r border-gray-800">   
                 <span className="text-sm font-semibold text-white">{dayNames[index]}</span>
                 <span className={`text-xl mt-1 w-8 h-8 flex items-center justify-center rounded-full ${
                  date.toDateString() === new Date().toDateString() ? 'bg-blue-600 font-bold text-white' : 'text-gray-300'
                  }`}> {date.getDate()}</span>       
               </div>
             ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 relative">
                <div className="flex min-h-max relative">
                    <div className="w-16 shrink-0 border-r border-gray-800 bg-[#100F1D]">
                        {hours.map((hour)=>(
                            <div key={`hour-label-${hour}`} className="h-20 border-b border-gray-800 flex justify-center py-2 text-xs text-white font-medium">
                                {hour === 0 ? '12 am' : hour < 12 ? `${hour} am` : hour === 12? '12 pm' : `${hour - 12} pm` }
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex-1 grid grid-cols-7 relative">
                        {weekDay.map((date, dayIndex)=>{
                            const processedEvents = getProcessed(date);

                            return(
                                <div key={`day-col-${dayIndex}`} className="border-r border-gray-800 relative min-h-80 ">
                                  {hours.map((hour)=>(
                                    <div key={`grid-line${hour}`} className="h-20 border-b border-gray-800/30"></div>
                                  ))}
                                  
                                  {processedEvents.map(event =>(
                                    <div key={event.id} className="absolute left-1 right-1 bg-blue-600/20 border border-blue-500 rounded-md p-1.5 
                                    overflow-hidden shadow-sm backdrop-blur-sm transition-all hover:bg-blue-600/30 z-10" style={event.positionStyle}>
                                       <p className="text-xs font-semibold text-blue-100 line-clamp-1">{event.summary}</p>
                                       <p className="text-[10px] text-blue-300 mt-0.5">{event.formattedTime}</p>
                                    </div>
                                  ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
          </div>
      </div>
    );
}