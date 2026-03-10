import { z } from "zod";
import { GEventSchema, GoogleSchema } from "./Evento"; 
import { SchemaEtiqueta, extras_dict } from "./Etiquetas";

export const reminderSchema = z.object({
    method: z.literal("popup"), 
    minutes: z.number().min(0).max(40320)
});


export const SchemaCrearActividad = GEventSchema.extend({
  transparency: z.enum(["transparent", "opaque"]).optional(),
   recurrence: z.array(z.string()).optional(), 
    reminders: z.object({ 
        useDefault: z.boolean(),
        overrides: z.array(reminderSchema).optional() 
    }).optional(),
    //etiqueta: SchemaEtiqueta.optional(),
    //prioridad: extras_dict.optional()
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