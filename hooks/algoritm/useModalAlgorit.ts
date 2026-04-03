// hooks/calendar/algorithm/useModalAlgoritmo.ts
'use client'

import { useState } from "react"
import { toast } from "sonner"
import { ejecutarAlgoritmo } from "../../lib/algoritmo/getAlgoritmo"
import type { Algoritmo } from "../../interfaces/algoritmo"

interface UseModalAlgoritmoProps {
  onClose:   () => void
  onSuccess: () => void
}

export function useModalAlgoritmo({ onClose, onSuccess }: UseModalAlgoritmoProps) {
  const [horaInicio,       setHoraInicio]       = useState("08:00")
  const [horaFin,          setHoraFin]           = useState("20:00")
  const [diasContemplados, setDiasContemplados]  = useState(5)
  const [gap,              setGap]               = useState(15)
  const [longFirst,        setLongFirst]         = useState(false)
  const [idEtiqueta,       setIdEtiqueta]        = useState<number | undefined>(undefined)
  const [loading,          setLoading]           = useState(false)

  const handleEjecutar = async () => {
    setLoading(true)

    const payload: Algoritmo = {
      tiempo_descanso: {       
        hora_inicio: horaInicio,
        hora_fin:    horaFin,
      },
      dias_contemplados: diasContemplados,
      gap,
      long_first: longFirst,
      idEtiqueta,
    }

    const result = await ejecutarAlgoritmo(payload)
    setLoading(false)

    if (result.success) {
      toast.success("Calendario ordenado", {
        description: "El algoritmo reorganizó tus actividades.",
      })
      onSuccess()
      onClose()
    } else {
      toast.error("No se pudo ordenar el calendario", {
        description: result.error,
      })
    }
  }

  return {
    horaInicio, setHoraInicio,
    horaFin,    setHoraFin,
    diasContemplados, setDiasContemplados,
    gap,              setGap,
    longFirst,        setLongFirst,
    idEtiqueta,       setIdEtiqueta,
    loading,
    handleEjecutar,
  }
}