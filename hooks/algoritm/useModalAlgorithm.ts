'use client'

import { useState } from "react"
import { toast } from "sonner"
import { algorithmHook } from "../calendar/algorithm/sortAgenda"
import { AlgorithmResponse, Config } from "../../interfaces/Algorithm"

interface UseModalAlgoritmoProps {
  onClose:   () => void
  onAlgorithmSuccess: (result: AlgorithmResponse) => void
}

export function useModalAlgoritmo({ onClose, onAlgorithmSuccess }: UseModalAlgoritmoProps) {
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
      tag: idEtiqueta || 9999999,
    }

    const result = await algorithm.sortAgenda(payload)
    if (result == 400) {
      toast.error("No se pudo ordenar el algoritmo.", {
        description:"Asegúrese de que hayan actividades por organizar."
      })
    }
    if (result == 4000) {
      toast.error("No se pudo ordenar el algoritmo.", {
        description:"Asegúrese de que al menos una tarea esté marcada como libre, ya que solo estas tareas se reacomodan."
      })
    }
    if (result == 500) {
      toast.error("No se pudo ordenar el algoritmo.", {
        description:"Ocurrió un error dentro de nuestros servidores. Nos disculpamos por las molestias."
      })
    }
    setLoading(false)

    if (typeof result !== 'number') {
      toast.success("Calendario ordenado", {
        description: "El algoritmo reorganizó tus actividades.",
      })
      onAlgorithmSuccess(result)
    }
    onClose()
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