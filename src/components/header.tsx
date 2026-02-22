'use client';
import { HiMenu, HiChevronDown } from "react-icons/hi";

interface CalendarHeaderProps {
  toggleSidebar: () => void;
}

export default function CalendarHeader({ toggleSidebar }: CalendarHeaderProps) {
  return (
    <header className=" bg-[#010112] fixed top-0 left-0 z-50 h-16 flex items-center justify-between p-4 lg:px-6 w-full">
      <div className="flex items-center gap-4 lg:gap-80">
        <MenuToggle toggleSidebar={toggleSidebar} />
        <DateNavigation />
      </div>
      <div className="flex items-center gap-4">
        <ActionButtons />
      </div>

    </header>
  );
}

function MenuToggle({ toggleSidebar }: CalendarHeaderProps) {
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 text-white hover:text-white hover:bg-gray-800 transition-colors focus:outline-none"
      aria-label="Alternar menú lateral"
    >
       <HiMenu className="w-7 h-7" />
    </button>
  );
}


function DateNavigation() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-blue-600 rounded-lg overflow-hidden">
        <button className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          &lt;
        </button>
        <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 border-x border-blue-600 transition-colors">
          Hoy
        </button>
        <button className="px-3 py-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
          &gt;
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <div className="relative">
          <select className="border border-blue-600 text-white text-sm rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-gray-700 transition-colors appearance-none pr-8">
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <HiChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
          </div>
        </div>
        
        <span className="text-xl font-semibold text-white tracking-wide">
          Febrero
        </span>
      </div>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-3">
      <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg flex items-center gap-1 transition-all shadow-sm shadow-blue-900/20">
        Crear
        <span className="text-lg leading-none ml-1">+</span>
      </button>
      <div className="border border-blue-600 rounded-xl relative hidden sm:block">
            <select className="borderborder-gray-800 text-white text-sm rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-gray-700 transition-colors appearance-none pr-8">
            <option value="mes">Mes</option>
            <option value="semana">Semana</option>
            <option value="dia">Día</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <HiChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-4 h-4" />
            </div>
      </div>
    </div>
  );
}