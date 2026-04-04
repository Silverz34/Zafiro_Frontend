'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import CalendarHeader from './header';
import { ViewType } from '../../../hooks/calendar/calendar';
import type { PrioridadType } from '../../../hooks/custom/modalconstantes';

interface Dashboard {
  children: React.ReactNode;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onOpenModal: () => void;

  prioriDesactivadas: PrioridadType[]; 
  onTogglePriority: (priority: PrioridadType) => void;
  etiquetasDesactivadas: string[];
  onToggleEtiqueta: (id: string) => void;
  onSuccess: () => void;
}

export default function DashboardLayout({ children, currentDate, 
  setCurrentDate, currentView, setCurrentView, onOpenModal, onSuccess,
  prioriDesactivadas, onTogglePriority, etiquetasDesactivadas, onToggleEtiqueta }: Dashboard) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-[#010112] text-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen}
        prioriDesactivadas={prioriDesactivadas}
        onTogglePriority={onTogglePriority}
        etiquetasDesactivadas={etiquetasDesactivadas}
        onToggleEtiqueta={onToggleEtiqueta}
      />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <CalendarHeader
         toggleSidebar={toggleSidebar} currentDate={currentDate} setCurrentDate={setCurrentDate}
          currentView={currentView} setCurrentView={setCurrentView} onOpenModal={onOpenModal} onSuccess={onSuccess} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

    </div>
  );
}