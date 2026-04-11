
'use client'

import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { HiX as HiXIcon } from "react-icons/hi"
import type { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import UnscheduledTray from "../previewAlgorithmo/tray"
import AgendaCalendarGrid from "../previewAlgorithmo/calendarGrid"


interface AcceptancePromptProps {
  preview:  AlgorithmResponse
  onAccept: () => void
  onReject: () => void
  onRetry: () => void
  onClose:  () => void
}

export default function AcceptancePrompt({
  preview, onAccept, onReject, onRetry, onClose
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
              onClick={() => setConfirmandoRechazo(true)}
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

        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[65vh]">
          <AgendaCalendarGrid tareas={preview.tareas_agendadas} />
          <UnscheduledTray tareas={preview.tareas_no_agendadas} />          
        </div>

        <div className="px-6 py-4 border-t border-[#1e1d3a] bg-[#080716]">

          {confirmandoRechazo ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-center text-gray-400">
                ¿Seguro que quieres rechazar? Los cambios se perderán y no podrás recuperarlos.
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
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full mt-4">
           
            <Button
              variant="ghost"
              onClick={() => setConfirmandoRechazo(true)}
              className="border border-[#AB3535]/50 text-[#AB3535] hover:bg-[#AB3535]/10 text-sm h-9 w-full sm:w-auto"
            >
              Rechazar cambios
            </Button>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={onRetry}
                className="flex-1 sm:flex-none border border-blue-600 text-white hover:bg-white/5 text-sm h-9"
              >
                Reintentar
              </Button>
              <Button
                onClick={onAccept}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-[#3864c3] text-white text-sm font-semibold h-9"
              >
                Aceptar cambios
              </Button>
            </div>
          </div>
          )}
        </div>

      </DialogContent>
    </Dialog>
  )
}