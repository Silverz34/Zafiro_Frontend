"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useAjustes } from "../../../hooks/user/useAjustes";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label }  from "@/components/ui/label";
import { GraduationCap, Briefcase, Clock, Sparkles } from "lucide-react";
import Image from "next/image";

const OCUPACIONES = [
  {
    value: "estudiante",
    label: "Estudiante",
    sub:   "Preparatoria / Universidad",
    icon:  GraduationCap,
  },
  {
    value: "trabajador",
    label: "Sector Laboral",
    sub:   "Activo laboralmente",
    icon:  Briefcase,
  },
];

const HORAS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: i === 0 ? "12:00 am" : i < 12 ? `${i}:00 am` : i === 12 ? "12:00 pm" : `${i - 12}:00 pm`,
}));


const getHorasFin = (inicio: number) => {
  const slots: typeof HORAS = [];
  for (let i = 1; i < 24; i++) {
    slots.push(HORAS[(inicio + i) % 24]);
  }
  return slots;
};

export default function CompletarPerfil() {
  const { isLoaded, isSignedIn } = useAuth();
  const { guardarAjustes, isLoading, error } = useAjustes();

  const [ocupacion,   setOcupacion]   = useState("estudiante");
  const [horaInicio,  setHoraInicio]  = useState<number>(22);
  const [horaFin,     setHoraFin]     = useState<number>(6);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await guardarAjustes({ ocupacion, hora_inicio: horaInicio, hora_fin: horaFin });
    if (exito) window.location.href = "/agenda";
  };

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div className="min-h-screen bg-[#0a0918] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-indigo-700/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-48 h-48 bg-blue-800/10 rounded-full blur-[80px] pointer-events-none" />

      <Card className="w-full max-w-md bg-[#0d0c1e]/90 border border-[#1e1d3a] rounded-2xl shadow-2xl shadow-blue-950/40 backdrop-blur-sm relative z-10">
        <CardHeader className="px-7 pt-6 pb-2 text-center">
          <div className="flex justify-center mb-3">
            <Image src="/Logo_zafiro.png" alt="Zafiro Logo" width={500} height={500} className="h-10 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Configura tu Agenda
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm mt-1">
            Cuéntanos un poco sobre ti para personalizar tu experiencia
          </CardDescription>
        </CardHeader>

        <CardContent className="px-7 pb-7 pt-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {error && (
              <div className="px-4 py-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-gray-400">¿A qué te dedicas?</Label>
              <div className="grid grid-cols-2 gap-3">
                {OCUPACIONES.map(({ value, label, sub, icon: Icon }) => {
                  const isSelected = ocupacion === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setOcupacion(value)}
                      className={`
                        flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 text-center
                        ${isSelected
                          ? "bg-blue-600/20 border-blue-500 text-white"
                          : "bg-[#171733] border-[#1e1d3a] text-gray-400 hover:border-blue-800 hover:text-gray-300"}
                      `}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? "text-blue-400" : "text-gray-500"}`} />
                      <div>
                        <p className="text-sm font-semibold">{label}</p>
                        <p className="text-xs opacity-60 mt-0.5">{sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-gray-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Horario de sueño
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500 pl-1">Inicio</span>
                  <Select
                    value={String(horaInicio)}
                    onValueChange={(v) => setHoraInicio(Number(v))}
                  >
                    <SelectTrigger className="w-full bg-[#171733] border-[#1e1d3a] text-white focus:ring-blue-600 rounded-xl h-[52px] text-sm font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      sideOffset={6}
                      className="bg-[#0d0c1e] border-[#1e1d3a] text-white w-[--radix-select-trigger-width] [&_[data-radix-select-viewport]]:max-h-[175px] [&_[data-radix-select-viewport]]:overflow-y-auto [&_[data-radix-select-viewport]]:scroll-smooth"
                    >
                      {HORAS.map(h => (
                        <SelectItem key={h.value} value={String(h.value)}>
                          {h.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500 pl-1">Fin</span>
                  <Select
                    value={String(horaFin)}
                    onValueChange={(v) => setHoraFin(Number(v))}
                  >
                    <SelectTrigger className="w-full bg-[#171733] border-[#1e1d3a] text-white focus:ring-blue-600 rounded-xl h-[52px] text-sm font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      side="bottom"
                      sideOffset={6}
                      className="bg-[#0d0c1e] border-[#1e1d3a] text-white w-[--radix-select-trigger-width] [&_[data-radix-select-viewport]]:max-h-[175px] [&_[data-radix-select-viewport]]:overflow-y-auto [&_[data-radix-select-viewport]]:scroll-smooth"
                    >
                      {getHorasFin(horaInicio).map(h => (
                        <SelectItem key={h.value} value={String(h.value)}>
                          {h.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-5 mt-1 disabled:opacity-50 transition-all"
            >
              {isLoading ? "Guardando..." : "Ir a mi Agenda"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}