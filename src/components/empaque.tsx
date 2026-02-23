'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';
import CalendarHeader from './header';

interface Dashboard {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Dashboard) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-[#010112] text-white overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <CalendarHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>

    </div>
  );
}