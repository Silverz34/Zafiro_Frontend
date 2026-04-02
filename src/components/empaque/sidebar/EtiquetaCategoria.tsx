
'use client'

import { useState } from 'react';
import { Plus, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ModalEtiqueta from '@/components/modal/ModalEtiqueta';
import { useEtiquetas } from '../../../../hooks/user/useEtiquetas';
import type { EtiquetaFrontend } from '../../../../lib/CrudEtiquetas/getEtiqueta';
import { useEtiquetasCtx } from '@/context/EtiquetaContext';

interface EtiquetaProp{
  desactivadas: string[];
  onToggleEtiqueta: (id: string) => void;
}

export default function Etiquetas({desactivadas, onToggleEtiqueta}: EtiquetaProp) {

  const { etiquetas, agregarEtiqueta, editarEtiqueta, borrarEtiqueta } = useEtiquetasCtx();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [etiquetaEditar, setEtiquetaEditar] = useState<EtiquetaFrontend | null>(null);

  const handleCrear = async (nueva: any) => {
    await agregarEtiqueta({ nombre: nueva.nombre, color: nueva.color });
  };

  const handleEditar = async (actualizada: any) => {
    await editarEtiqueta(actualizada.id, { nombre: actualizada.nombre, color: actualizada.color });
    setEtiquetaEditar(null);
  };

  const handleEliminar = async (etiqueta: EtiquetaFrontend) => {
    await borrarEtiqueta(etiqueta.id);
    const estabaDesactivada = desactivadas.includes(String(etiqueta.id));
    if (!estabaDesactivada) {
      onToggleEtiqueta(String(etiqueta.id)); // lo marca como desactivado = ya no afecta nada
    }
  };

  const toggleEtiqueta = (id: string) => {
    onToggleEtiqueta(id);
  };

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm text-white font-medium">Etiquetas</h3>
        <button onClick={() => { setEtiquetaEditar(null); setModalAbierto(true); }} className="text-blue-500 hover:text-blue-400 transition-colors">
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="space-y-2.5">
        {etiquetas.map((etiqueta) => {
          const isActive = !desactivadas.includes(String(etiqueta.id));
          return (
            <div
              key={etiqueta.id}
              onClick={() => onToggleEtiqueta(String(etiqueta.id))}
              className="flex items-center rounded-lg px-3 py-2.5 transition-all duration-200"
              style={{
                backgroundColor: isActive ? etiqueta.color : `${etiqueta.color}55`,
              }}
            >
             <button
                className="flex items-center justify-center w-5 h-5 rounded-full bg-white/80 border border-blue-600 shrink-0 transition-all"
              >
                {isActive && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
              </button>
              <span className={`flex-1 ml-3 text-sm font-semibold text-white transition-opacity ${!isActive && 'opacity-60'}`}>
                {etiqueta.nombre}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-white/70 hover:text-white transition-colors ml-2 p-1 rounded-full hover:bg-white/10">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[#0d0c1e] border border-[#1e1d3a] text-white rounded-xl min-w-32.5"
                >
                  <DropdownMenuItem
                    onClick={() => { setEtiquetaEditar(etiqueta); setModalAbierto(true); }}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-lg"
                  >
                    <Pencil className="w-3.5 h-3.5 text-blue-400" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleEliminar(etiqueta)}
                    className="flex items-center gap-2 cursor-pointer hover:bg-rose-500/10 text-rose-400 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>
      <ModalEtiqueta
        isOpen={modalAbierto}
        onClose={() => { setModalAbierto(false); setEtiquetaEditar(null); }}
        onCrear={handleCrear}
        editar={etiquetaEditar}
        onEditar={handleEditar}
      />

    </div>
  );
}