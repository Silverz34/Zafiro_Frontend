'use client'

import { HiX, HiOutlineCalendar, HiChevronDown } from "react-icons/hi";
import { Undo2, Bell, Clock, BriefcaseBusiness } from "lucide-react";
import { useModalActividad } from "../../../hooks/actividad/useModal";
import { PRIORIDADES, RECURRENCE_OPTIONS, REMINDER_OPTIONS, OCUPACION, formatDate } from "../../../hooks/custom/modalconstantes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MiniCalendar from "@/components/empaque/sidebar/MiniCalendar";
import { TimePicker } from "../ui/time";
import { MiniModal } from "../../../interfaces/Preview";
import { useEtiquetas } from "../../../hooks/useEtiquetas";
import { Tag, AlignLeft } from "lucide-react"; 


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  modo: "crear" | "editar";
  eventoInicial?: MiniModal | null;
}

export default function ModalActividad({ isOpen, onClose, onSuccess, eventoInicial, modo }: ModalProps) {
  const {etiquetas} = useEtiquetas();
  const {
    titulo, setTitulo,
    selectedDate, setSelectedDate,
    showPicker, setShowPicker,
    description, setDescription, 
    idEtiqueta, setIdEtiqueta,
    horaInicio,
    horaFin, setHoraFin,
    isAllDay, setIsAllDay,
    recurrence, setRecurrence,
    reminder, setReminder,
    prioridad, setPrioridad,
    transparency, setTransparency,
    loading,
    handleHoraInicio,
    handleGuardar,
  } = useModalActividad({ onClose, onSuccess, eventoInicial, modo });


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          bg-[#010112] border border-[#2554E0] text-white
          max-w-120 w-full rounded-2xl
          shadow-2xl shadow-blue-950/60
          p-0 gap-0 overflow-hidden
          [&>button]:hidden
        "
      >
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-[#1e1d3a]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-semibold tracking-wide text-white">
                {modo === "editar" ? "Editar Actividad" : "Nueva Actividad"}
              </DialogTitle>
            </div>
            <button
              onClick={onClose}
              className="text-white-500 hover:bg-blue-600 rounded-lg p-1.5 transition-all"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[72vh] scrollbar-thin scrollbar-thumb-[#2a2948] scrollbar-track-transparent">
          <div className="group">
            <Input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Estudiar matematicas..."
              className="
                bg-transparent border-0 border-b-2 border-[#1e1d3a]
                focus-visible:border-blue-600 focus-visible:ring-0
                text-2xl font-medium text-white placeholder:text-gray-600
                px-0 rounded-none pb-2 h-auto transition-colors duration-200
              "
            />
          </div>
          <div className="flex items-center gap-3 px-1">
            <AlignLeft className="w-4 h-4 text-gray-500 shrink-0" />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Añade una descripción (opcional)..."
              className="bg-transparent border-0 focus-visible:ring-0 text-sm font-medium text-gray-300 placeholder:text-gray-600 px-0 h-auto shadow-none"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl px-4 py-3 border border-[#2554E0] hover:border-[#2a2948] transition-colors">
            <div className="flex flex-col">
              <Label className="text-sm font-medium text-gray-200 cursor-pointer">
                Todo el día
              </Label>
              <span className="text-xs text-gray-500 mt-0.5">
                Sin hora de inicio ni fin
              </span>
            </div>
            <Switch
              checked={isAllDay}
              onCheckedChange={setIsAllDay}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-[#2a2948]"
            />
          </div>
          <div className="flex flex-col gap-0 rounded-xl border border-[#2554E0]">

            <div className="px-4 py-3 border-b border-[#1e1d3a] bg-[#0d0c1e] gap-1.5 flex items-center">
              <span className="text-[14px] font-bold text-white tracking-[0.12em]">
                Fecha y horario
              </span>
              <Clock className="w-4 h-4"></Clock>
            </div>

            <div className="px-4 py-3 flex flex-col gap-3">
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => setShowPicker(p => !p)}
                  className={`
                    flex-1 flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg border transition-all duration-200 font-medium
                    ${showPicker
                      ? "bg-blue-600/12 border-blue-600 text-blue-300"
                      : "bg-[#0d0c1e] border-[#2a2948] text-gray-200 hover:border-blue-600/50 hover:text-white"}
                  `}
                >
                  <HiOutlineCalendar className={`w-4 h-4 shrink-0 ${showPicker ? "text-blue-400" : "text-gray-500"}`} />
                  <span className="flex-1">{formatDate(selectedDate)}</span>
                  <HiChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showPicker ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
              {showPicker && (
                <div className="absolute left-10 mt-10 z-50  rounded-xl overflow-hidden border border-blue-600">
                  <MiniCalendar
                    selectedDate={selectedDate}
                    onSelectDate={d => {
                      setSelectedDate(d);
                      setShowPicker(false);
                    }}
                  />
                </div>
              )}

              {!isAllDay && (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-white w-10 text-right shrink-0 font-medium">
                      Inicio
                    </span>
                    <TimePicker
                      value={horaInicio}
                      onChange={(handleHoraInicio)}
                    />

                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] w-10 text-right shrink-0 font-medium">
                      Fin
                    </span>
                    <TimePicker value={horaFin} onChange={setHoraFin} minTime={horaInicio} />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 px-4">
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white uppercase tracking-wider ml-0.5">
                Repetición
              </Label>

              <Select value={recurrence} onValueChange={setRecurrence}>
                <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <Undo2 className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl shadow-xl shadow-black/50">
                  {RECURRENCE_OPTIONS.map(o => (
                    <SelectItem key={o.value} value={o.value}
                      className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white uppercase tracking-wider ml-0.5">
                Aviso
              </Label>

              <Select value={reminder} onValueChange={setReminder}>
                <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl shadow-xl shadow-black/50">
                  {REMINDER_OPTIONS.map(o => (
                    <SelectItem key={o.value} value={o.value}
                      className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white uppercase tracking-wider ml-0.5">
                Ocupación
              </Label>

              <Select value={transparency} onValueChange={(val) => setTransparency(val as "opaque" | "transparent")}>
                <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl shadow-xl shadow-black/50">
                  {OCUPACION.map(o => (
                    <SelectItem key={o.value} value={o.value}
                      className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg">
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-[11px] font-semibold text-white uppercase tracking-wider ml-0.5">
                Etiqueta
              </Label>
              <Select 
                value={idEtiqueta ? String(idEtiqueta) : "none"} 
                onValueChange={(val) => setIdEtiqueta(val === "none" ? undefined : Number(val))}
              >
                <SelectTrigger className="w-full bg-[#111029] border-blue-600 text-gray-200 text-sm h-9 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <SelectValue placeholder="Sin etiqueta" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-[#111029] border-blue-600 text-white rounded-xl shadow-xl shadow-black/50 max-h-48 overflow-y-auto">
                  
                  <SelectItem value="none" className="text-gray-400 text-sm focus:bg-white/5 rounded-lg">
                    Sin etiqueta
                  </SelectItem>
                  {etiquetas.map((e) => (
                    <SelectItem 
                      key={e.id} 
                      value={String(e.id)}
                      className="text-gray-300 text-sm focus:bg-blue-600/20 focus:text-white rounded-lg cursor-pointer"
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
          </div>
          

          <div className="flex flex-col gap-2.5">
            <Label className="text-[11px] font-semibold text-white uppercase tracking-wider ml-0.5">
              Prioridad
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORIDADES.map(({ nivel, color, bg, border }) => {
                const active = prioridad === nivel;
                return (
                  <button
                    key={nivel}
                    onClick={() => setPrioridad(nivel)}
                    className={`
                      py-2.5 text-sm font-semibold rounded-xl border transition-all duration-200
                      flex items-center justify-center gap-2 capitalize
                      ${active
                        ? `${bg} ${border} ${color}`
                        : "bg-[#111029] border-[#1e1d3a] text-gray-500 hover:border-[#2a2948] hover:text-gray-400"}
                    `}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        active ? "bg-current shadow-[0_0_8px_currentColor]" : "bg-gray-600"
                      }`}
                    />
                    {nivel}
                  </button>
                );
              })}
            </div>
          </div>
          

        </div>

        <div className="flex items-center justify-end px-6 py-4 border-t border-[#1e1d3a] bg-[#080716]">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-white border border-blue-600 hover:text-white hover:bg-white/5 text-sm h-9 px-4"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleGuardar}
              disabled={loading || !titulo.trim()}
              className="
                bg-blue-600 hover:bg-blue-900
                text-white text-sm font-semibold h-9 px-5 rounded-lg transition-all duration-150
              "
            >
              {loading
                ? modo === "editar" ? "Actualizando..." : "Guardando..."
                : modo === "editar" ? "Actualizar" : "Guardar"}

            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}