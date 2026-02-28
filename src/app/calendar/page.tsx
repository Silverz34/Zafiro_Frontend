'use client'
import DashboardLayout from "@/components/empaque";
import { useEffect, useState } from 'react';
import CalendarGrid from "@/components/CalendarGrid";
import { fetchDailyActivities } from "../../../lib/calendarAction";
import { GoogleEvent } from "../../../interfaces/Evento";

export default function DashboardTemporal() {
  const [events, setEvents] = useState<GoogleEvent[] | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [lastFetchedMonth, setLastFetchedMonth] = useState <string | null >(null);
 useEffect(() => {
    const loadEvents = async () => {
      const currentMonthKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
      if (lastFetchedMonth !== currentMonthKey) {
        console.log(`Descargando datos: ${currentMonthKey}...`);
        const data = await fetchDailyActivities(currentDate.toISOString());
        
        if (data) {
          setEvents(data);
          setLastFetchedMonth(currentMonthKey); 
        }
      }
    };

    loadEvents();
  }, [currentDate, lastFetchedMonth]); 

  return (
    <DashboardLayout currentDate={currentDate} setCurrentDate={setCurrentDate}>
      <div className="pt-12">
       <CalendarGrid currentDate={currentDate} events={events || [] } />
      </div>
    </DashboardLayout>
  );
}