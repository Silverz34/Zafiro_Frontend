import { z } from "zod";
import { GoogleSchema } from "./Evento"; 
import { SchemaEtiqueta, extras_dict } from "./Etiquetas";
import { reminderSchema } from "./Remiders";


export const SchemaCrearActividad = z.object({
   id: z.string().optional(),
   summary: z.string().min(2, "El título es obligatorio"),
   start: GoogleSchema,
   end: GoogleSchema,
   transparency: z.enum(["transparent", "opaque"]).optional(),
   recurrence: z.array(z.string()).optional(), 
    reminders: z.object({ 
        useDefault: z.boolean(),
        overrides: z.array(reminderSchema).optional() 
    }).optional(),
    etiqueta: SchemaEtiqueta.optional(),
    prioridad: extras_dict.optional(),
    source: z.enum(["local", "google"]).optional(),
});

export const SchemaActividad = SchemaCrearActividad.extend({
    status: z.enum(["confirmed", "tentative", "cancelled"]).optional(),
    created: z.string().optional(), 
    updated: z.string().optional(), 
    eventType: z.enum(["default", "focusTime", "outOfOffice"]).optional(),
    recurringEventId: z.string().optional(),        
    originalStartTime: GoogleSchema.optional()
});

export type Actividad = z.infer<typeof SchemaActividad>;
export type CrearActividad = z.infer<typeof SchemaCrearActividad>;