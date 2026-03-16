
'use client';

import { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';

export type Etiqueta = {
  id:     string;
  label:  string;
  color:  string; 
};

const ETIQUETAS_DEFAULT: Etiqueta[] = [
  { id: '1', label: 'Trabajo',  color: '#C8934A' },
  { id: '2', label: 'Escuela',  color: '#D94F8A' },
  { id: '3', label: 'Artes',    color: '#3ABFAA' },
  { id: '4', label: 'Estudio',  color: '#3B4FC8' },
];

export default function Etiquetas() {
  const [etiquetas,  setEtiquetas]  = useState<Etiqueta[]>(ETIQUETAS_DEFAULT);
  const [activas,    setActivas]    = useState<string[]>(ETIQUETAS_DEFAULT.map(e => e.id));

  const toggleEtiqueta = (id: string) => {
    setActivas(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-white font-medium">Etiquetas</h3>
        <button className="text-blue-500 hover:text-blue-400 transition-colors">
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="space-y-2.5">
        {etiquetas.map((etiqueta) => {
          const isActive = activas.includes(etiqueta.id);
          return (
            <div
              key={etiqueta.id}
              className="flex items-center rounded-lg px-3 py-2.5 transition-all duration-200"
              style={{
                backgroundColor: isActive ? etiqueta.color : `${etiqueta.color}55`,
              }}
            >
             <button
                onClick={() => toggleEtiqueta(etiqueta.id)}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-white/80 border border-blue-600 shrink-0 transition-all"
              >
                {isActive && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </button>
              <span className={`flex-1 ml-3 text-sm font-semibold text-white transition-opacity ${!isActive && 'opacity-60'}`}>
                {etiqueta.label}
              </span>
              <button className="text-black hover:text-white transition-colors ml-2">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}