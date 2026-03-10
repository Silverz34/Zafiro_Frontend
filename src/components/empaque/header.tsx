'use client';

import Image from 'next/image';
import { useCalendarNavigation } from "../../../hooks/NavigationCalendar";
import { HiMenu, HiChevronDown } from "react-icons/hi";
import { ViewType } from '../../../hooks/calendar';

interface CalendarHeaderProps {
  toggleSidebar: () => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentView: ViewType;                  
  setCurrentView: (view: ViewType) => void;
  onOpenModal: () => void;
}

export default function CalendarHeader({ toggleSidebar, currentDate, setCurrentDate, 
  currentView, setCurrentView, onOpenModal }: CalendarHeaderProps) {
  const { 
    goToToday, 
    goToPrevious, 
    goToNext, 
    handleYearChange,
    formattedMonth, 
    currentYear,
    yearsRange, 
  } = useCalendarNavigation(currentDate, setCurrentDate, currentView);

  return (
    <header className="bg-[#010112] fixed top-0 left-0 z-50 h-16 flex items-center justify-between lg:px-6 w-full">

      <div className="flex items-center justify-between gap-50">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors">
            <HiMenu className="w-7 h-7" />
          </button>
          <div className="flex items-center">
            <Image src="/Logo_zafiro.png" alt="Zafiro Logo" width={500} height={500} className="h-10 w-auto" />
          </div>
        </div>
        <div className="flex items-center lg:gap-6 gap-3">
          <div className="flex items-center border border-blue-600 rounded-lg overflow-hidden">
            <button onClick={goToPrevious} className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">&lt;</button>
            <button onClick={goToToday} className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-x border-blue-600 transition-colors">Hoy</button>
            <button onClick={goToNext} className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">&gt;</button>
          </div>

          <div className="hidden sm:flex items-center gap-4 ml-2">
            <div className="relative">
              <select 
                value={currentYear}
                onChange={handleYearChange}
                className=" bg-[#010112] border border-blue-600 text-white text-sm rounded-lg pl-3 pr-8 py-1.5 outline-none cursor-pointer hover:bg-gray-800 transition-colors appearance-none"
              >
                {yearsRange.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <HiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
              </div>
            </div>

            <span className="text-lg font-semibold tracking-wide text-gray-100">
              {formattedMonth}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onOpenModal}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg flex items-center gap-1 transition-all shadow-md">
          Crear <span className="text-lg leading-none ml-1">+</span>
        </button>

        <div className=" relative hidden md:block">
          <select 
           value={currentView}
           onChange={(e) => setCurrentView(e.target.value as ViewType)}
           className=" bg-[#010112] border border-blue-600 text-white text-sm rounded-lg pl-3 pr-8 py-1.5 outline-none cursor-pointer hover:bg-gray-800 transition-colors appearance-none">
            <option value="dia">Día</option>
            <option value="semana">Semana</option>
            <option value="mes">Mes</option>

          </select>
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
           <HiChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>

    </header>
  );
}