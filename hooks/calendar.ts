import { useMemo } from "react";
import { GoogleEvent } from "../interfaces/Evento";

export type ViewType = 'dia' | 'semana' | 'mes' | 'año'
export function CalendarLogic(currentDate: Date, rawEvents: GoogleEvent[], view: ViewType){
    const days= useMemo(()=>{
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        if (view = 'dia'){
            return [new Date(currentDate)];
        }
        
        else if(view === 'semana'){
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate()- currentDate.getDay());

            return Array.from({length: 7}).map((_, i) => {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                return day;
            });
        }

        else if (view === 'mes'){
            const startOfMonth = new Date(year, month, 1);
            const startDayOfWeek = startOfMonth.getDay();
            const firstDay= new Date(startOfMonth);
            firstDay.setDate(startOfMonth.getDate()- startDayOfWeek);
            
            return Array.from({length: 42}).map((_, i)=>{
                const day = new Date(firstDay);
                day.setDate(firstDay.getDate()+i);
                return day;
            });
        }

        else if(view === 'año'){
            return Array.from({length: 12}).map((_, i) => new Date (year, i ,1));
        }
        return[];
    }, [currentDate, view]);
    
    const hours = Array.from({length: 24}).map((_, i)=> i);
    const getProcessed = (date: Date) =>{
        if(!rawEvents) return[];
        const dayEvent = rawEvents.filter(event =>{
            if (!event.start.dateTime) return false;
            const eventDate = new Date(event.start.dateTime);
            return(
                eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear()
            );
        });

        return dayEvent.map((event: GoogleEvent) => {
            const start = new Date(event.start.dateTime!);
            const end = new Date( event.end.dateTime!);

            const startHour = start.getHours() + start.getMinutes()/60;
            const duration = (end.getTime()- start.getTime()) / (1000 * 60 * 60 );
            return {
                ...event,
                positionStyle: { 
                    top: `${startHour * 80}px`,
                    height: `${duration * 80}px`,
                },
                formattedTime: start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            };
        });
    }
    return {days, hours, getProcessed};
};