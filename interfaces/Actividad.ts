import { z } from "zod";
import { GEventSchema, GoogleSchema } from "./Evento"; 
import { SchemaEtiqueta, extras_dict } from "./Etiquetas";

export const reminderSchema = z.object({
    method: z.enum(["email", "popup"]), 
    minutes: z.number()
});

export const SchemaActividad = GEventSchema.extend({
    status: z.enum(["confirmed", "tentative", "cancelled"]).optional(),
    created: z.string().optional(), 
    updated: z.string().optional(), 
    transparency: z.enum(["transparent", "opaque"]).optional(),
    eventType: z.enum(["default", "focusTime", "outOfOffice"]).optional(),
    recurrence: z.array(z.string()).optional(),     
    recurringEventId: z.string().optional(),        
    originalStartTime: GoogleSchema.optional(), 

    reminders: z.object({ 
        useDefault: z.boolean(),
        overrides: z.array(reminderSchema).optional() 
    }).optional(),
    etiqueta: SchemaEtiqueta.optional(),
    prioridad: extras_dict.optional()
});

export type Actividad = z.infer<typeof SchemaActividad>;