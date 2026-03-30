import { useMemo } from "react";
import { lecturaActividad } from "../../interfaces/Preview";

export type ViewType = 'dia' | 'semana' | 'mes';

export function CalendarLogic(currentDate: Date, rawEvents: lecturaActividad[], view: ViewType) {
    const days = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        if (view === 'dia') {
            return [new Date(currentDate)];
        }

        else if (view === 'semana') {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

            return Array.from({ length: 7 }).map((_, i) => {
                const day = new Date(startOfWeek);
                day.setDate(startOfWeek.getDate() + i);
                return day;
            });
        }

        else if (view === 'mes') {
            const startOfMonth = new Date(year, month, 1);
            const startDayOfWeek = startOfMonth.getDay();
            const firstDay = new Date(startOfMonth);
            firstDay.setDate(startOfMonth.getDate() - startDayOfWeek);

            return Array.from({ length: 42 }).map((_, i) => {
                const day = new Date(firstDay);
                day.setDate(firstDay.getDate() + i);
                return day;
            });
        }
        return [];

    }, [currentDate, view]);

    const hours = Array.from({ length: 24 }).map((_, i) => i);
    
    const getProcessed = (date: Date) => {
        if (!rawEvents) return [];
        
        const targetStartOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const targetEndOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

        const parseDateStr = (dateStr: string) => {
            // Un string YYYY-MM-DD sin tiempo se parsea localmente agregando T00:00:00
            if (dateStr.length === 10) return new Date(`${dateStr}T00:00:00`);
            return new Date(dateStr);
        };

        const dayEvent = rawEvents.filter(event => {
            const startStr = event.start?.dateTime || event.start?.date;
            const endStr = event.end?.dateTime || event.end?.date;
            if (!startStr || !endStr) return false;

            const start = parseDateStr(startStr);
            const end = parseDateStr(endStr);
            
            // Ajustamos el end para eventos todo el día para evitar que se pinte en un día de extra
            // (Google envía "2023-10-11" como end de un evento el día 10, lo que sería las 00:00 del día 11)
            if (event.start?.date && event.end?.date) {
               end.setTime(end.getTime() - 1); 
            }

            // Excluímos los eventos cuyo start es exactamente a las 00:00 del día pero duraban hasta ahí y los consideramos del día anterior usando overlap matemático real:
            return start.getTime() <= targetEndOfDay.getTime() && end.getTime() > targetStartOfDay.getTime();
        });

        return dayEvent.map((event: any) => {
            const startStr = event.start?.dateTime || event.start?.date;
            const endStr = event.end?.dateTime || event.end?.date;
            const start = parseDateStr(startStr);
            const end = parseDateStr(endStr);
            const isAllDay = !!event.start?.date;

            if (isAllDay) {
                end.setTime(end.getTime() - 1); 
            }

            // Clampear para que el bloque no se salga de las 24 horas del targetDate (del día iterado por FullCalendar-like logic)
            const renderStart = start < targetStartOfDay ? targetStartOfDay : start;
            const renderEnd = end > targetEndOfDay ? targetEndOfDay : end;

            let startHour = 0;
            let duration = 24; // Por defecto todo el día

            if (!isAllDay) {
                // Cálculo fraccional usando las fechas locales
                startHour = renderStart.getHours() + renderStart.getMinutes() / 60;
                duration = (renderEnd.getTime() - renderStart.getTime()) / (1000 * 60 * 60);
                
                // Safety net para evitar duraciones negativas si hay un error raro
                if (duration <= 0) duration = 0.5;
            }

            return {
                ...event,
                isAllDay,
                positionStyle: {
                    top: `${startHour * 64}px`,
                    height: `${duration * 64}px`,
                },
                formattedTime: isAllDay ? 'Todo el día' : renderStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                endTime: isAllDay ? '' : renderEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        });
    }
    
    return { days, hours, getProcessed };
};
