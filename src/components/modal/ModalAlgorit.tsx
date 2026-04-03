
'use client'

import { HiX } from "react-icons/hi"
import { BrainCircuit, Clock, CalendarDays, Timer, SortDesc, Tag } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button }     from "@/components/ui/button"
import { Label }      from "@/components/ui/label"
import { Switch }     from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePicker } from "@/components/ui/time"
import { useModalAlgoritmo } from "../../../hooks/algoritm/useModalAlgorit"
import { useEtiquetasCtx }   from "@/context/EtiquetaContext"
import { TimeRangePicker } from "../ui/TimeRange"

interface ModalAlgoritmoProps {
  isOpen:    boolean
  onClose:   () => void
  onSuccess: () => void
}

// Opciones de gap en minutos
const GAP_OPTIONS = [
  { value: 5,  label: "5 minutos"  },
  { value: 10, label: "10 minutos" },
  { value: 15, label: "15 minutos" },
  { value: 30, label: "30 minutos" },
]

export default function ModalAlgoritmo({ isOpen, onClose, onSuccess }: ModalAlgoritmoProps) {
  const { etiquetas } = useEtiquetasCtx()

  const {
    horaInicio, setHoraInicio,
    horaFin,    setHoraFin,
    diasContemplados, setDiasContemplados,
    gap,              setGap,
    longFirst,        setLongFirst,
    idEtiqueta,       setIdEtiqueta,
    loading,
    handleEjecutar,
  } = useModalAlgoritmo({ onClose, onSuccess })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#010112] border border-[#2554E0] text-white
          max-w-md w-full rounded-2xl
          shadow-2xl shadow-blue-950/60
          p-0 gap-0 overflow-hidden
          [&>button]:hidden
        "
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-[#1e1d3a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-xl font-semibold text-white">
                Ordenar Calendario
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-600 rounded-lg p-1.5 transition-all"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-0">
            Configura los parámetros para que el algoritmo reorganice tus actividades.
          </p>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-5">
          {/* Rango horario */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#2554E0] bg-[#0d0c1e]">
                <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                    Rango horario de trabajo
                    </span>
                </div>
                <TimeRangePicker
                    horaInicio={horaInicio}
                    horaFin={horaFin}
                    onChangeInicio={setHoraInicio}
                    onChangeFin={setHoraFin}
                    labelInicio="Desde"
                    labelFin="Hasta"
                />
            </div>

          {/* Días contemplados */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-blue-400" />
              Días contemplados
              <span className="ml-auto text-blue-400 font-bold text-sm normal-case tracking-normal">
                {diasContemplados}
              </span>
            </Label>
            <input
              type="range"
              min={3}
              max={15}
              step={1}
              value={diasContemplados}
              onChange={e => setDiasContemplados(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>3 días</span>
              <span>15 días</span>
            </div>
          </div>

          {/* Gap */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-400" />
              Tiempo entre actividades
            </Label>
            <Select
              value={String(gap)}
              onValueChange={val => setGap(Number(val))}
            >
              <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl">
                {GAP_OPTIONS.map(o => (
                  <SelectItem
                    key={o.value}
                    value={String(o.value)}
                    className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg"
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Etiqueta */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-400" />
              Filtrar por etiqueta
              <span className="text-gray-600 text-xs normal-case tracking-normal font-normal ml-1">
                (opcional)
              </span>
            </Label>
            <Select
              value={idEtiqueta ? String(idEtiqueta) : "none"}
              onValueChange={val => setIdEtiqueta(val === "none" ? undefined : Number(val))}
            >
              <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg">
                <SelectValue placeholder="Todas las etiquetas" />
              </SelectTrigger>
              <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl max-h-48 overflow-y-auto">
                <SelectItem
                  value="none"
                  className="text-gray-400 text-sm focus:bg-white/5 rounded-lg"
                >
                  Todas las etiquetas
                </SelectItem>
                {etiquetas.map(e => (
                  <SelectItem
                    key={e.id}
                    value={String(e.id)}
                    className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: e.color }} />
                      {e.nombre}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Switches */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#1e1d3a] bg-[#0d0c1e]">
            <div className="flex items-center gap-2 mb-1">
              <SortDesc className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Opciones
              </span>
            </div>

            {/* long_first */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-200 font-medium">
                  Priorizar actividades largas
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  Las tareas de mayor duración se agendan primero
                </span>
              </div>
              <Switch
                checked={longFirst}
                onCheckedChange={setLongFirst}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-[#2a2948] shrink-0 ml-4"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#1e1d3a] bg-[#080716] gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-white border border-blue-600 hover:bg-white/5 text-sm h-9 px-4"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleEjecutar}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-900 text-white text-sm font-semibold h-9 px-5 rounded-lg"
          >
            {loading ? "Ordenando..." : "Ordenar ahora"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}