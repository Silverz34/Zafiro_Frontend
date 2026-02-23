import { useMemo } from "react";
import { GoogleEvent } from "../interfaces/GEvent";

export function CalendarLogic(currentDate: Date, rawEvents: GoogleEvent[]){
    const weekDay = useMemo(()=>{
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate()- currentDate.getDay());

        return Array.from({length: 7}).map((_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return day;
        });
    }, [currentDate]);

    const hours = Array.from({length: 24}).map((_, i)=> i);
    
}