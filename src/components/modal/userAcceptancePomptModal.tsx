import { useState } from "react"
import { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"

interface AcceptancePromptProps {
    preview: AlgorithmResponse
    onAccept: () => void
    onReject: () => void
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function AcceptancePrompt({
    preview, onAccept, onReject, isOpen, onClose
}:AcceptancePromptProps) {
    return (
        <Dialog open={isOpen}>
            <DialogContent className="
            bg-[#010112] border border-[#2554E0] text-white
            max-w-md w-full rounded-2xl
            p-0 gap-0 overflow-hidden
            [&>button]:hidden
            ">
                <DialogHeader className="px-6 pt-5 pb-4 border-b border-[#1e1d3a]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <DialogTitle className="text-xl font-semibold text-white">
                            ¡Éxito!
                            </DialogTitle>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-0">
                        Las actividades fueron reacomodadas exitosamente.
                    </p>
                </DialogHeader>

                <div>
                    {preview.tareas_agendadas && (
                        <div>
                            {preview.tareas_agendadas.map((tarea, key: number) => (
                                <div key={key}>
                                    <p>{tarea.summary}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {preview.tareas_no_agendadas && (
                        <div>
                            {preview.tareas_no_agendadas.map((tarea, key: number) => (
                                <div key={key}>
                                    <p>{tarea.summary}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button onClick={onClose}>Cerrar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}