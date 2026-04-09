'use client';
import MiniCalendar from './MiniCalendar';
import Prioridad from './EtiquetasPrioridad';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { FiLogOut } from "react-icons/fi";
import Etiquetas from './EtiquetaCategoria';
import type { PrioridadType } from '../../../../hooks/custom/modalconstantes';
import { Skeleton } from "@/components/ui/skeleton"

interface SidebarProps {
  isOpen: boolean;   
  prioriDesactivadas: PrioridadType[];
  onTogglePriority: (priority: PrioridadType) => void;
  etiquetasDesactivadas: string[];
  onToggleEtiqueta: (id: string) => void; 
}

export default function Sidebar({ isOpen, prioriDesactivadas, onTogglePriority, 
  etiquetasDesactivadas, onToggleEtiqueta }: SidebarProps) {
  const { user, isLoaded } = useUser();
  return (
    <aside 
      className={`
        ${isOpen ? 'pt-17 items-center w-78 opacity-100' : 'w-0 opacity-0 overflow-hidden'} 
        transition-all duration-700 ease-in-out border-r border-blue-600 flex flex-col h-full shrink-0
      `}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-500">
        <MiniCalendar/>
        <Prioridad prioriDesactivadas={prioriDesactivadas} onTogglePriority={onTogglePriority}/>
        <Etiquetas desactivadas={etiquetasDesactivadas} onToggleEtiqueta={onToggleEtiqueta}/>
      </div>

      <div className="p-3 border-t border-blue-600">
        {isLoaded && user ? (
          <div className="flex items-center justify-between border border-blue-600 p-2 rounded-xl w-full">
                <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                    <img 
                      src={user.imageUrl} 
                      alt="Perfil del usuario" 
                      className="w-10 h-10 rounded-full object-cover border border-gray-700 shrink-0"
                    />
                    <div className="flex flex-col overflow-hidden min-w-0">
                      <span className="text-sm font-semibold text-white truncate block">
                        {user.fullName || 'Usuario'}
                      </span>
                      <span className="text-xs text-gray-500 truncate block">
                        {user.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                </div>
                <SignOutButton>
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-800 rounded-lg transition-colors shrink-0"
                      title="Cerrar sesión"
                    >
                     <FiLogOut className="w-5 h-5" />
                    </button>
                </SignOutButton>
          </div>
        ) : (
          <div className="flex items-center justify-between border border-blue-600 p-4 rounded-xl w-full">
            <div className="flex items-center gap-3 overflow-hidden w-full">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 overflow-hidden w-full">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="w-5 h-5 shrink-0 ml-4" />
          </div>
        )}
      </div>
    </aside>
  );
}