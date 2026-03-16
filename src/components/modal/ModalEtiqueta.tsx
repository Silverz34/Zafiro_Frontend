'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input }  from '@/components/ui/input';
import { Label }  from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { COLORES_ETIQUETA } from '../empaque/sidebar/colores';
import type { Etiqueta } from '../empaque/sidebar/EtiquetaCategoria';

interface ModalEtiquetaProps {
  isOpen:    boolean;
  onClose:   () => void;
  onCrear:   (etiqueta: Etiqueta) => void;
}

export default function ModalEtiqueta({ isOpen, onClose, onCrear }: ModalEtiquetaProps) {
  const [nombre, setNombre] = useState('');
  const [colorSeleccionado, setColorSeleccionado] = useState<string>(COLORES_ETIQUETA[0]);

  const handleGuardar = () => {
    if (!nombre.trim()) return;

    onCrear({
      id:    crypto.randomUUID(),
      label: nombre.trim(),
      color: colorSeleccionado,
    });
    setNombre('');
    setColorSeleccionado(COLORES_ETIQUETA[0]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0d0c1e] border border-[#2554E0] text-white max-w-sm rounded-2xl gap-0 p-0 overflow-hidden [&>button]:hidden">
        <div className="h-1.5 w-full bg-blue-600" />

        <DialogHeader className="px-5 pt-4 pb-2">
          <DialogTitle className="text-white text-lg font-bold">
            Nueva Etiqueta
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-400">Nombre</Label>
            <Input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Personal, Trabajo..."
              className="bg-[#171733] border-[#1e1d3a] text-white placeholder:text-gray-600 focus-visible:ring-blue-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-sm text-gray-400">Color</Label>
            <div className="grid grid-cols-5 gap-2.5">
              {COLORES_ETIQUETA.map((color) => (
                <button
                  key={color}
                  onClick={() => setColorSeleccionado(color)}
                  className="w-9 h-9 rounded-full transition-all duration-150 hover:scale-110"
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  {colorSeleccionado === color && (
                    <span className="flex items-center justify-center w-full h-full">
                      <span className="w-3 h-3 rounded-full bg-white/80 border border-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-2 flex items-center gap-3 px-3 py-2.5 rounded-full w-fit"
              style={{ backgroundColor: colorSeleccionado }}
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white/80 border border-blue-600">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              </div>
              <span className="text-sm font-semibold text-white">
                {nombre.trim() || 'Vista previa'}
              </span>
            </div>
          </div>

        </div>

        <div className="h-px bg-[#1e1d3a] mx-5" />

        <DialogFooter className="px-5 py-4 flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent border-[#2554E0] text-white hover:bg-white/5"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleGuardar}
            disabled={!nombre.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Crear
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}