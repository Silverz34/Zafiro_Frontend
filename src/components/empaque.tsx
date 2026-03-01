'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';
import CalendarHeader from './header';
import { ViewType } from '../../hooks/calendar';
interface Dashboard {
  children: React.ReactNode;
  currentDate: Date;
  setCurrentDate: (date : Date) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

export default function DashboardLayout({ children, currentDate, setCurrentDate,currentView, setCurrentView}: Dashboard) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-[#010112] text-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <CalendarHeader toggleSidebar={toggleSidebar} currentDate ={currentDate} setCurrentDate={setCurrentDate}
         currentView={currentView} setCurrentView = {setCurrentView}/>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

    </div>
  );
}