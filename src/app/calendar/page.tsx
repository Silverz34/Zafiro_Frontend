'use client'

import DashboardLayout from "@/components/empaque/empaque";
import { useState } from 'react';
import { ViewType } from "../../../hooks/calendar/calendar";
import { useSession } from "../../../hooks/useSession";
import Loading from "@/components/iu/loading";
import ModalActividad from "@/components/modal/ModalActividad";
import EventoPreview from "@/components/modal/MiniModal";
import DayView from "@/components/viewsCalendar/DayView";
import WeekView from "@/components/viewsCalendar/WeekView";
import MonthView from "@/components/viewsCalendar/MonthView";
import type { MiniModal } from "../../../interfaces/Preview";
import { useCalendarEvents } from "../../../hooks/calendar/useCalendarEvent";

export default function DashboardTemporal() {
  const { ready } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('semana');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEditar, setEventoEditar] = useState<MiniModal | null>(null);
  const [miniModal, setMiniModal] = useState<MiniModal | null>(null);

  const { events, recargarEventos } = useCalendarEvents({ ready, currentDate });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dia':
        return <DayView currentDate={currentDate} events={events}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
      case 'semana':
        return <WeekView currentDate={currentDate} events={events}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
      case 'mes':
        return <MonthView currentDate={currentDate} events={events}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
      default:
        return <WeekView currentDate={currentDate} events={events}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
    }
  };

  return (
    <>
      <DashboardLayout
        currentDate={currentDate} setCurrentDate={setCurrentDate}
        currentView={currentView} setCurrentView={setCurrentView}
        onOpenModal={() => setIsModalOpen(true)}
      >
        <div className="pt-12 h-full">
          {renderCurrentView()}
        </div>
      </DashboardLayout>

      <ModalActividad
        isOpen={isModalOpen}
        modo={eventoEditar ? "editar" : "crear"}
        eventoInicial={eventoEditar}
        onClose={() => { setIsModalOpen(false); setEventoEditar(null); }}
        onSuccess={() => { recargarEventos(); setEventoEditar(null); }}
      />

      <EventoPreview
        evento={miniModal}
        onClose={() => setMiniModal(null)}
        onEdit={(evento) => { setMiniModal(null); setEventoEditar(evento); setIsModalOpen(true); }}
        onDelete={() => { setMiniModal(null); recargarEventos(); }}
      />
    </>
  );
}