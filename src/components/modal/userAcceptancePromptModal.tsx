
'use client'

import { useState } from "react"
import { BrainCircuit, CheckCircle2, XCircle } from "lucide-react"
import { HiX as HiXIcon } from "react-icons/hi"
import type { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import Task from "../ui/algorithm-task"

interface AcceptancePromptProps {
  preview:  AlgorithmResponse
  onAccept: () => void
  onReject: () => void
  onClose:  () => void
}

export default function AcceptancePrompt({
  preview, onAccept, onReject, onClose
}: AcceptancePromptProps) {

  const [confirmandoRechazo, setConfirmandoRechazo] = useState(false)

  const totalAgendadas    = preview.tareas_agendadas.length
  const totalNoAgendadas  = preview.tareas_no_agendadas.length

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#010112] border border-[#2554E0] text-white
          max-w-lg w-full rounded-2xl
          p-0 gap-0 overflow-hidden
          [&>button]:hidden
        "
      >
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-[#1e1d3a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold text-white">
                 Tareas reoganizadas 
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-600 rounded-lg p-1.5 transition-all"
            >
              <HiXIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3 mt-4">
                <div className="flex gap-4 px-3 py-2 rounded-lg bg-[#2FA941]/10 border border-[#2FA941]/30 flex-1 justify-center">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2FA941]"/>
                        <p className="text-xs text-gray-400 font-medium">Agendadas</p>
                        
                    </div>
                    <p className="text-xl font-bold text-[#2FA941] leading-none">{totalAgendadas}</p>
                </div>
                <div className="flex gap-4 px-3 py-2 rounded-lg bg-[#AB3535]/10 border border-[#AB3535]/30 flex-1 justify-center">
                    <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-[#AB3535] shrink-0" />
                        <p className="text-xs text-gray-400 font-medium">Sin agendar</p>
                    </div>
                    <p className="text-xl font-bold text-[#AB3535] leading-none">{totalNoAgendadas}</p>    
                </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[55vh]">
          {totalAgendadas > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {preview.tareas_agendadas.map(tarea => (
                  <Task key={tarea.id} tarea={tarea} isScheduled={true} />
                ))}
              </div>
            </div>
          )}

          {/* No agendadas */}
          {totalNoAgendadas > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Sin espacio disponible
              </p>
              <p className="text-xs text-gray-500">
                    Estas actividades no encontraron un hueco libre en el rango configurado.
              </p>
              <div className="flex flex-col gap-2">
                {preview.tareas_no_agendadas.map(tarea => (
                  <Task key={tarea.id} tarea={tarea} isScheduled={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1e1d3a] bg-[#080716]">

          {confirmandoRechazo ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-center text-gray-400">
                ¿Seguro que quieres rechazar? Los cambios en Google Calendar
                ya fueron aplicados y tendrás que deshacerlos manualmente.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setConfirmandoRechazo(false)}
                  className="flex-1 border border-[#2554E0] text-white hover:bg-white/5 text-sm h-9"
                >
                  Volver
                </Button>
                <Button
                  onClick={onReject}
                  className="flex-1 bg-[#AB3535] hover:bg-[#8A2525] text-white text-sm h-9"
                >
                  Sí, rechazar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => setConfirmandoRechazo(true)}
                className="flex-1 border border-[#AB3535]/50 text-[#AB3535] hover:bg-[#AB3535]/10 text-sm h-9"
              >
                Rechazar cambios
              </Button>
              <Button
                onClick={onAccept}
                className="flex-1 bg-[#2FA941] hover:bg-[#228531] text-white text-sm font-semibold h-9"
              >
                Aceptar cambios
              </Button>
            </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}