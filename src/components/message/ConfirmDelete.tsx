'use client'

import { useState } from "react";
import { toast } from "sonner";
import { deleteActividad } from "../../../lib/CrudActividad/deleteActividad";
import { AlertDialog,  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "../ui/alert-dialog";


interface confirmed{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    eventoId: string;
    eventoNombre?: string;
    onSuccess: () => void;
}

export default function ConfirmDelete({open, onOpenChange, eventoId,eventoNombre,onSuccess}:confirmed){
    const[deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        const result = await deleteActividad(eventoId);
        setDeleting(false);

        if (result.success) {
        toast.success("Actividad eliminada");
        onOpenChange(false);
        onSuccess();
        } else {
        toast.error("No se pudo eliminar la actividad");
        }
    };
    
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="bg-[#0d0c1e] border border-[#2554E0] text-white rounded-2xl">
            <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
                ¿Eliminar actividad?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
                <span className="text-white font-medium">"{eventoNombre}"</span> será eliminada
                permanentemente de tu Google Calendar. Esta acción no se puede deshacer.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#2554E0] text-white hover:bg-white/5">
                Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
            >
                {deleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    );
}
