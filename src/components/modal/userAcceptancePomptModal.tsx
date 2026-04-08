import { useState } from "react"
import { AlgorithmResponse } from "../../../interfaces/Algorithm"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"

interface AcceptancePromptProps {
    preview: AlgorithmResponse
    onAccept: () => void
    onReject: () => void
    isOpen: boolean
}

export default function AcceptancePrompt({
    preview, onAccept, onReject, isOpen
}:AcceptancePromptProps) {
    const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(isOpen)
    return (
        <Dialog open={isDialogOpen}>
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
                    <Button onClick={() => {setIsDialogOpen(false)}}>Cerrar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}