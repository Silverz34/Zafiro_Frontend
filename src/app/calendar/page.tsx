'use client'
import DashboardLayout from "@/components/empaque/empaque";
import { useEffect, useState } from 'react';
import { fetchDailyActivities } from "../../../lib/calendarAction";
import { GoogleEvent } from "../../../interfaces/Evento";
import { ViewType } from "../../../hooks/calendar";
import ModalActividad from "@/components/modal/ModalActividad";
import { MiniModal } from "../../../interfaces/Preview";
import EventoPreview from "@/components/modal/MiniModal";

import DayView from "@/components/viewsCalendar/DayView";
import WeekView from "@/components/viewsCalendar/WeekView";
import MonthView from "@/components/viewsCalendar/MonthView";

export default function DashboardTemporal() {
  const [events, setEvents] = useState<GoogleEvent[] | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('semana');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRecargarEventos = () =>{
    setLastFetchedMonth(null);
  }
  const [lastFetchedMonth, setLastFetchedMonth] = useState <string | null >(null);
  const [MiniModal, setMiniModal] = useState<MiniModal | null>(null);


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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dia':
        return <DayView currentDate={currentDate} 
        events={events || []} 
        onOpenModal={() => setIsModalOpen(true)} 
        onEventClick={setMiniModal}
        />;

      case 'semana':
        return <WeekView currentDate={currentDate} 
        events={events || []} 
        onOpenModal={() => setIsModalOpen(true)} 
        onEventClick={setMiniModal}
        />;
      case 'mes':
        return <MonthView currentDate={currentDate} 
        events={events || []} 
        onOpenModal={() => setIsModalOpen(true)}
        onEventClick={setMiniModal} 
        />;
    default: 
        return <WeekView currentDate={currentDate} 
        events={events || []} 
        onOpenModal={() => setIsModalOpen(true)}
        onEventClick={setMiniModal} 
        />;
    }
  };

  return (
    <>
      <DashboardLayout 
        currentDate={currentDate} 
        setCurrentDate={setCurrentDate}
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onOpenModal={() => setIsModalOpen(true)}
      >
      
        <div className="pt-12 h-full">
          {renderCurrentView()}
        </div>
      </DashboardLayout>
      <ModalActividad isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
        onSuccess={handleRecargarEventos}/>
        <EventoPreview
          evento={MiniModal}
          onClose={() => setMiniModal(null)}
        />
    </>
  );
}