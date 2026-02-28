import z from "zod";
import { GEventSchema} from "./Evento"; 
import { SchemaEtiqueta, extras_dict } from "./Etiquetas";



export const remiderSchema = z.object({
    method: z.enum(["email", "popup"]), 
    minutes: z.number()
});

export const SchemaActividad = GEventSchema.extend({
    status : z.enum(["confirmed","tentative","cancelled"]).optional,
    created : z.string, 
    update: z.string, 
    transparency : z.enum(["transparent","opaque"]).optional,
    eventType: z.enum(["default", "focusTime", "outOfOffice"]),
    remider_dict : z.object({
        useDefault: z.boolean,
        overrides: remiderSchema
    }),
    etiqueta: SchemaEtiqueta,
    prioridad: extras_dict
});

export type Actividad= z.infer<typeof SchemaActividad>