// hooks/calendar/algorithm/useModalAlgoritmo.ts
'use client'

import { useState } from "react"
import { toast } from "sonner"
import { algorithmHook } from "../calendar/algorithm/sortAgenda"
import { Config } from "../../interfaces/Algorithm"

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
  const algorithm = new algorithmHook()

  const handleEjecutar = async () => {
    setLoading(true)

    const payload: Config = {
      tiempo_descanso: {       
        inicio: horaFin, // la diferencia yace en que la aplicación pide el tiempo de trabajo, mientras que el algoritmo trabaja con el tiempo de descanso, por lo que se tienen que invertir
        fin:    horaInicio,
      },
      dias_contemplados: diasContemplados,
      gap,
      long_first: longFirst,
      tag: idEtiqueta,
    }

    const result = await algorithm.sortAgenda(payload)
    if (!result) {
      toast.error("No se pudo ordenar el algoritmo.")
    }
    setLoading(false)

    if (result) {
      toast.success("Calendario ordenado", {
        description: "El algoritmo reorganizó tus actividades.",
      })
      onSuccess()
      onClose()
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