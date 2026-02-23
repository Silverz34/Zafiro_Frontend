'use client'
import DashboardLayout from "@/components/empaque";
import { useEffect, useState } from 'react';
import CalendarGrid from "@/components/CalendarGrid";
import { fetchDailyActivities } from "../../../lib/calendarAction";
import { GoogleEvent } from "../../../interfaces/GEvent";

export default function DashboardTemporal() {
  const [events, setEvents] = useState<GoogleEvent[] | null>(null);
  const [currentDate] = useState(new Date());
  
  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchDailyActivities();
      setEvents(data);
    };
    loadEvents();
  }, []);
  
  return (
    <DashboardLayout>
      <div className="pt-15">
        <CalendarGrid currentDate={currentDate} events={events || []} />
      </div>
    </DashboardLayout>
  );
}