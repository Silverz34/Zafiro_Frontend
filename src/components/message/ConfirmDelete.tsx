'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { deleteActividad } from '../../../lib/CrudActividad/deleteActividad'
import {
  AlertDialog, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface ConfirmDeleteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventoId: string
  eventoNombre?: string
  recurringEventId?: string 
  instanceDate?: string 
  onSuccess: () => void
}

export default function ConfirmDelete({
  open, onOpenChange,
  eventoId, eventoNombre,
  recurringEventId,
  onSuccess,
}: ConfirmDeleteProps) {
  const [deleting, setDeleting] = useState(false)
  
  // Detectamos si es recurrente
  const isRecurring = Boolean(recurringEventId) || eventoId.includes('_');

  const handleDelete = async () => {
    setDeleting(true)
    
    // Si es recurrente mandamos 'all', si no, mandamos 'single'
    const mode = isRecurring ? 'all' : 'single';
    const result = await deleteActividad(eventoId, mode, recurringEventId)
    
    setDeleting(false)

    if (result.success) {
      toast.success(isRecurring ? 'Serie completa eliminada' : 'Evento eliminado')
      onOpenChange(false)
      onSuccess()
    } else {
      toast.error('No se pudo eliminar el evento')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#0d0c1e] border border-[#2554E0] text-white rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            {isRecurring ? '¿Eliminar serie de eventos?' : '¿Eliminar actividad?'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            <span className="text-white font-medium">"{eventoNombre}"</span>
            <br/><br/>
            {isRecurring
              ? 'Este es un evento que se repite. Al eliminarlo, se borrará TODA la serie de repeticiones de tu calendario (pasadas y futuras).'
              : 'Esta actividad será eliminada permanentemente de tu Google Calendar.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-col mt-4">

          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white"
          >
            {isRecurring ? 'Sí, eliminar toda la serie' : 'Eliminar'}
          </Button>

          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={deleting}
            className="w-full border border-[#2554E0] text-white hover:bg-white/5"
          >
            Cancelar
          </Button>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}