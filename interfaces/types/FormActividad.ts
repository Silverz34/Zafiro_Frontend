import { TipoOcurrencia } from "../../hooks/calendar/Ocurrencia";

export type PrioridadType = "Alta" | "Media" | "Baja";

//datos para el formulario que despues seran validados antes de enviar por el esquema de zod
export interface FormActividad {
    id?: string
    titulo: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    description?: string;

    isAllDay: boolean;
    recurrence: TipoOcurrencia;
    reminder: string;
    transparency: "opaque" | "transparent";
    prioridad: PrioridadType;
    idEtiqueta?: number;
}