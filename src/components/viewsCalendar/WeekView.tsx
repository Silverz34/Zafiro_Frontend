'use client'
import { CalendarLogic } from "../../../hooks/calendar/calendar"
import type { ViewProps } from "../../../interfaces/types/props";
import { useEtiquetas } from "../../../hooks/user/useEtiquetas";
import { PRIORIDADES } from "../../../hooks/custom/modalconstantes";

export default function WeekView({ currentDate, events, onOpenModal, onEventClick }: ViewProps) {
  const { days, hours, getProcessed } = CalendarLogic(currentDate, events, 'semana');
  const { etiquetas } = useEtiquetas();
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="flex flex-col h-full bg-[#100F1D] rounded-xl border border-gray-800 overflow-hidden text-white">
      <div className="flex border-b border-gray-800">
        <div className="w-16 border-r border-gray-800 shrink-0 flex items-center justify-center text-xs text-white font-bold bg-blue-600">
          GMT
        </div>
        <div className="flex-1 grid grid-cols-7">
          {days.map((date, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-2 border-r border-gray-800">
              <span className="text-sm font-semibold text-white">{dayNames[index]}</span>
              <span className={`text-xl mt-1 w-8 h-8 flex items-center justify-center rounded-full ${date.toDateString() === new Date().toDateString() ? 'bg-blue-600 font-bold text-white' : 'text-gray-300'
                }`}> {date.getDate()}</span>
            </div>
          ))}
        </div>
      </div>

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

                        className="absolute left-1 right-1 bg-blue-600/20 border border-blue-500 rounded-md p-1.5 
                        overflow-hidden shadow-sm backdrop-blur-sm transition-all hover:bg-blue-600/30 z-10" style={{ ...event.positionStyle, ...dynamicCardStyle }}>
                        <p className="text-xs font-semibold text-blue-100 line-clamp-1">{event.summary}</p>
                        <p className="text-[10px] text-blue-300 mt-0.5">{event.formattedTime} - {event.endTime}</p>
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-600" style={dynamicBarStyle} />
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
  );
}