'use client';

import React, { useState } from 'react';
export type PriorityLevel = 'Alta' | 'Media' | 'Baja';
const PRIORITIES = [
  { id: 'Alta', label: 'Alta', bgColor: 'bg-[#AB3535]' },    
  { id: 'Media', label: 'Media', bgColor: 'bg-[#E2761F]' },  
  { id: 'Baja', label: 'Baja', bgColor: 'bg-[#2FA941]' },    
] as const;

export default function Prioridad() {
  const [selectedPriorities, setSelectedPriorities] = useState<PriorityLevel[]>([
    'Alta', 'Media', 'Baja'
  ]);

  const togglePriority = (priority: PriorityLevel): void => {
    setSelectedPriorities((prevSelected) => {
      if (prevSelected.includes(priority)) {
        return prevSelected.filter((p) => p !== priority);
      }
      return [...prevSelected, priority];
    });
  };

  return (
    <div className="w-full max-w-70 p-4 bg-[#171733] rounded-xl">
      <h3 className="text-sm text-white mb-4 font-medium">Prioridad</h3>
      
      <div className="space-y-3">
        {PRIORITIES.map((priority) => {
          const isActive = selectedPriorities.includes(priority.id as PriorityLevel);
          return (
            <button
              key={priority.id}
              onClick={() => togglePriority(priority.id as PriorityLevel)}
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