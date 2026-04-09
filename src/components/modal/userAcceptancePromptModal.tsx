import { useState } from "react"
import { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import Task from "../ui/algorithm-task"

interface AcceptancePromptProps {
    preview: AlgorithmResponse
    onAccept: () => void
    onReject: () => void
}

export default function AcceptancePrompt({
    preview, onAccept, onReject
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
                            <div className="overflow-y-scroll max-h-100">
                                {preview.tareas_agendadas.map((tarea, key: number) => (
                                    <Task key={key} tarea={tarea} isScheduled={true}/>
                                ))}
                            </div>
                        </div>
                    )}

                    {preview.tareas_no_agendadas.length > 0 && (
                        <div>
                            <p>Tareas que no se pudieron reacomodar:</p>
                            <div className="overflow-y-scroll max-h-100">
                                {preview.tareas_no_agendadas.map((tarea, key: number) => (
                                    <Task key={key} tarea={tarea} isScheduled={false} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center gap-10">
                        <Button onClick={onAccept} className="px-5 py-2 bg-[#2b7e38] hover:font-bold hover:bg-[#2FA941]">Aceptar cambios</Button>
                        <Button onClick={onReject} className="px-5 py-2 bg-[#7c2c2c] hover:font-bold hover:bg-[#AB3535]">Rechazar cambios</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}