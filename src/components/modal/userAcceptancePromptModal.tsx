import { useState } from "react"
import { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import Task from "../ui/algorithm-task"

interface AcceptancePromptProps {
    preview: AlgorithmResponse
    onAccept: () => void
    onReject: () => void
    onClose: () => void
}

export default function AcceptancePrompt({
    preview, onAccept, onReject, onClose
}:AcceptancePromptProps) {
    return (
        <Dialog open={true}>
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

                <div className="px-6 py-5 flex flex-col gap-5">

                    {preview.tareas_agendadas.length > 0 && (
                        <div>
                            <p>Tareas que se reacomodaron:</p>
                            {preview.tareas_agendadas.map((tarea, key: number) => (
                                <Task key={key} tarea={tarea} isScheduled={true}/>
                            ))}
                        </div>
                    )}

                    {preview.tareas_no_agendadas.length > 0 && (
                        <div>
                            <p>Tareas que no se pudieron reacomodar:</p>
                            {preview.tareas_no_agendadas.map((tarea, key: number) => (
                                <Task key={key} tarea={tarea} isScheduled={false} />
                            ))}
                        </div>
                    )}

                    <Button onClick={onClose}>Cerrar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}