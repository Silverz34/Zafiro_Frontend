'use client'
export const dynamic = 'force-dynamic'

import DashboardLayout from "@/components/empaque/empaque";
import { useState } from 'react';
import { ViewType } from "../../../hooks/calendar/calendar";
import { useSession } from "../../../hooks/conexion/useSession";
import ModalActividad from "@/components/modal/ModalActividad";
import EventoPreview from "@/components/modal/MiniModal";
import DayView from "@/components/viewsCalendar/DayView";
import WeekView from "@/components/viewsCalendar/WeekView";
import MonthView from "@/components/viewsCalendar/MonthView";
import type { MiniModal } from "../../../interfaces/Preview";
import { useCalendarEvents } from "../../../hooks/calendar/useCalendarEvent";
import type { PrioridadType } from "../../../hooks/custom/modalconstantes";
import { EtiquetasProvider } from "@/context/EtiquetaContext";
import { AlgorithmResponse } from "../../../interfaces/Algorithm";


export default function DashboardTemporal() {
  const { ready } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('semana');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEditar, setEventoEditar] = useState<MiniModal | null>(null);
  const [miniModal, setMiniModal] = useState<MiniModal | null>(null);
  const { events, isLoading, recargarEventos } = useCalendarEvents({ ready, currentDate })
  const [prioridadesDesactivadas, setPrioridadesDesactivadas] = useState<PrioridadType[]>([]);
  const [etiquetasDesactivadas, setEtiquetasDesactivadas] = useState<string[]>([]);

  const [ preview, setPreview ] = useState<AlgorithmResponse | null>(null)

  const togglePriority = (priority: PrioridadType) => {
    setPrioridadesDesactivadas(prev =>
      prev.includes(priority) ? prev.filter(p => p !== priority) : [...prev, priority]
    );
  };

  const toggleEtiqueta = (id: string) => {
    setEtiquetasDesactivadas(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const eventosSeguros = Array.isArray(events) ? events : [];
  const eventosFiltrados = eventosSeguros.filter(evento => {
    const pasaEtiqueta = !etiquetasDesactivadas.includes(String(evento.idEtiqueta));
    const prioridadCruda = evento.prioridadValor || (evento as any).prioridad?.valor || "media";
    const prioridadNormalizada = prioridadCruda.toLowerCase();
    const pasaPrioridad = !prioridadesDesactivadas.some(p => p.toLowerCase() === prioridadNormalizada);

    return pasaEtiqueta && pasaPrioridad;
  });

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dia':
        return <DayView currentDate={currentDate} events={eventosFiltrados}
          isLoading={isLoading}     
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal}
           />;
      case 'semana':
        return <WeekView currentDate={currentDate} events={eventosFiltrados}
          isLoading={isLoading}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
      case 'mes':
        return <MonthView currentDate={currentDate} events={eventosFiltrados}
          isLoading={isLoading}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
      default:
        return <WeekView currentDate={currentDate} events={eventosFiltrados}
          isLoading={isLoading}
          onOpenModal={() => setIsModalOpen(true)} onEventClick={setMiniModal} />;
    }
  };

  return (
    <EtiquetasProvider>
      <>
        
          <DashboardLayout
            currentDate={currentDate} setCurrentDate={setCurrentDate}
            currentView={currentView} setCurrentView={setCurrentView}
            onOpenModal={() => setIsModalOpen(true)}
            prioriDesactivadas={prioridadesDesactivadas}
            onTogglePriority={togglePriority}
            etiquetasDesactivadas={etiquetasDesactivadas}
            onToggleEtiqueta={toggleEtiqueta}
            onAlgorithmSuccess={(result) => setPreview(result)}
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
    </EtiquetasProvider>
  );
}