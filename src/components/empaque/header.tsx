'use client';

import Image from 'next/image';
import { useCalendarNavigation } from '../../../hooks/calendar/NavigationCalendar';
import { HiMenu } from "react-icons/hi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ViewType } from '../../../hooks/calendar/calendar';
import { Switch } from "@/components/ui/switch";
import { useGoogleSync } from '../../../hooks/conexion/useSesionG';
import ModalAlgoritmo from '../modal/ModalAlgorithm';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";         
import { Info } from "lucide-react"; 
import { AlgorithmResponse } from '../../../interfaces/Algorithm';

interface CalendarHeaderProps {
  toggleSidebar: () => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onOpenModal: () => void;
  isAlgoModalOpen: boolean;
  onOpenAlgorithmModal: () => void;
  onCloseAlgorithmModal: () => void;
  onAlgorithmSuccess: (result: AlgorithmResponse) => void;
}

export default function CalendarHeader({ toggleSidebar, currentDate, setCurrentDate,
  currentView, setCurrentView, onOpenModal, isAlgoModalOpen, onOpenAlgorithmModal, onCloseAlgorithmModal, onAlgorithmSuccess }: CalendarHeaderProps) {
  const { isConnected, isLoading, toggleSync } = useGoogleSync();
  const {
    goToToday,
    goToPrevious,
    goToNext,
    formattedMonth,
    currentYear,
  } = useCalendarNavigation(currentDate, setCurrentDate, currentView);



  return (
    <>
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
              <span className="text-lg font-semibold tracking-wide text-gray-100">
                {formattedMonth}
              </span>
              <span className="text-lg font-semibold tracking-wide text-gray-100">
                {currentYear}
              </span>

              {/*Boton para la logica del algoritmo  */}
              <button
                onClick={onOpenAlgorithmModal}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-900 transition-colors"
              >
                Ordenar Calendario
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 mr-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 cursor-default">
                    {!isConnected && !isLoading && (
                      <Info className="w-4 h-4 text-blue-400 shrink-0 animate-pulse" />
                    )}

                    <span className={`text-sm font-medium transition-colors
                      ${isConnected ? 'text-green-400' : 'text-gray-400'}`}>
                      {isConnected ? 'Sincronizado' : 'Vincular con Google Calendar'}
                    </span>

                    <Switch
                      checked={isConnected}
                      onCheckedChange={toggleSync}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-green-500"
                    />

                    {isLoading && (
                      <span className="text-xs text-gray-500 animate-pulse">
                        Cargando...
                      </span>
                    )}
                  </div>
                </TooltipTrigger>

                {/* Solo mostrar el tooltip cuando NO está conectado */}
                {!isConnected && !isLoading && (
                  <TooltipContent
                    side="bottom"
                    align="end"
                    className="
                      bg-[#0d0c1e] border border-[#2554E0] text-white
                      rounded-xl p-3 max-w-55 shadow-xl shadow-blue-950/40
                    "
                  >
                    <div className="flex flex-col gap-1.5">
                      <p className="text-xs font-semibold text-white">
                        Conecta tu Google Calendar
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Para ver y gestionar tus eventos necesitas vincular tu cuenta de Google.
                      </p>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <button onClick={onOpenModal}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1.5 px-4 rounded-lg flex items-center gap-1 transition-all shadow-md">
            Crear <span className="text-lg leading-none ml-1">+</span>
          </button>

          <div className="hidden md:block">
            <Select value={currentView} onValueChange={(v) => setCurrentView(v as ViewType)}>
              <SelectTrigger className="bg-[#010112] border border-blue-600 text-white text-sm rounded-lg h-8.5 w-25 px-3 focus:ring-0 focus:ring-offset-0 hover:bg-gray-800 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                sideOffset={6}
                className="bg-[#010112] border-blue-600 text-white w-[--radix-select-trigger-width] data-radix-select-viewport:overflow-y-auto data-radix-select-viewport:scroll-smooth"
              >
                <SelectItem value="dia" className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">Día</SelectItem>
                <SelectItem value="semana" className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">Semana</SelectItem>
                <SelectItem value="mes" className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">Mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      </header>
      <ModalAlgoritmo
        isOpen={isAlgoModalOpen}
        onClose={onCloseAlgorithmModal}
        onAlgorithmSuccess={onAlgorithmSuccess}
      />
    </>
  );
}