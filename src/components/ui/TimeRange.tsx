// src/components/ui/TimeRangePicker.tsx
'use client'
import { HORARIOS_COMPLETOS, obtenerHorasFin } from '../../../hooks/utils/timeUtils'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { TimeRangePickerProps } from '../../../interfaces/types/TimeProp'



export function TimeRangePicker({
  horaInicio,
  horaFin,
  onChangeInicio,
  onChangeFin,
  labelInicio = 'Inicio',
  labelFin    = 'Fin',
}: TimeRangePickerProps) {

  const handleInicio = (val: string) => {
    onChangeInicio(val)
    // Si la hora fin queda igual o antes, avanzarla automáticamente
    const horasFin = obtenerHorasFin(val)
    const finSigueValido = horasFin.some(h => h.value === horaFin)
    if (!finSigueValido && horasFin.length > 0) {
      onChangeFin(horasFin[0].value)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">

      {/* Inicio */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-gray-500 pl-1">{labelInicio}</span>
        <Select value={horaInicio} onValueChange={handleInicio}>
          <SelectTrigger className="w-full bg-[#171733] border-[#1e1d3a] text-white focus:ring-blue-600 rounded-xl h-11 text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={6}
            className="bg-[#0d0c1e] border-[#1e1d3a] text-white w-[--radix-select-trigger-width]
              data-radix-select-viewport:max-h-43.75
              data-radix-select-viewport:overflow-y-auto"
          >
            {HORARIOS_COMPLETOS.map(h => (
              <SelectItem key={h.value} value={h.value}>
                {h.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fin */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs text-gray-500 pl-1">{labelFin}</span>
        <Select value={horaFin} onValueChange={onChangeFin}>
          <SelectTrigger className="w-full bg-[#171733] border-[#1e1d3a] text-white focus:ring-blue-600 rounded-xl h-11 text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={6}
            className="bg-[#0d0c1e] border-[#1e1d3a] text-white w-[--radix-select-trigger-width]
             data-radix-select-viewport:max-h-43.75
              data-radix-select-viewport:overflow-y-auto"
          >
            {obtenerHorasFin(horaInicio).map(h => (
              <SelectItem key={h.value} value={h.value}>
                {h.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

    </div>
  )
}