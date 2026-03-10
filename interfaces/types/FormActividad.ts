import { TipoOcurrencia } from "../../hooks/Ocurrencia";

export type PrioridadType = "Alta" | "Media" | "Baja";
//datos para el formulario que despues seran validados antes de enviar por el squema de zod
export interface FormActividad{
    titulo: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;

    isAllDay: boolean;
    recurrencia: TipoOcurrencia;
    reminder: string;
    ocupacion: "opaque" | "transparent";
    prioridad: PrioridadType;
}