'use client'
import type { PrioridadType } from "../../../../hooks/custom/modalconstantes";

const PRIORITIES = [
  { id: 'Alta', label: 'Alta', bgColor: 'bg-[#AB3535]' },    
  { id: 'Media', label: 'Media', bgColor: 'bg-[#E2761F]' },  
  { id: 'Baja', label: 'Baja', bgColor: 'bg-[#2FA941]' },    
] as const;

interface PrioridadProps{
  selectedPriorities: PrioridadType[];
  onToggle: (priority: PrioridadType) => void;
}

export default function Prioridad({selectedPriorities, onToggle}: PrioridadProps) {

  return (
    <div className="w-full max-w-60 p-1 rounded-xl">
      <h3 className="text-sm text-white mb-4 font-medium">Prioridad</h3>
      
      <div className="space-y-3">
        {PRIORITIES.map((priority) => {
          const isActive = selectedPriorities.includes(priority.id as PrioridadType);
          return (
            <button
              key={priority.id}
              onClick={() => onToggle(priority.id as PrioridadType)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold text-white
                ${priority.bgColor}
                ${isActive ? 'opacity-100 shadow-md' : 'opacity-40 hover:opacity-60 grayscale-30'}
              `}
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/80 border border-blue-600">
                {isActive && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </div>
              
              {priority.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}