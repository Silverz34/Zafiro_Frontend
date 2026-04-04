"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useAjustes } from "../../../hooks/user/useAjustes";
import { HORARIOS_COMPLETOS, obtenerHorasFin } from "../../../hooks/utils/timeUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label }  from "@/components/ui/label";
import { GraduationCap, Briefcase, Clock} from "lucide-react";
import Image from "next/image";
import { TimeRangePicker } from "@/components/ui/TimeRange"; 

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

export default function CompletarPerfil() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { guardarAjustes, isLoading, error } = useAjustes();
  const [ocupacion,   setOcupacion]   = useState("estudiante");
  const [hora_inicio,  setHoraInicio]  = useState<string>("22:00");
  const [hora_fin,     setHoraFin]     = useState<string>("06:00");

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const exito = await guardarAjustes({
      ocupacion,
      hora_inicio: hora_inicio, 
      hora_fin: hora_fin,       
    });
    if (exito) {
      await user?.reload(); 
      window.location.assign("/calendar");
    }
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
               <TimeRangePicker
                horaInicio={hora_inicio}
                horaFin={hora_fin}
                onChangeInicio={setHoraInicio}
                onChangeFin={setHoraFin}
              />
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