import z from "zod";
import { GEventSchema, GoogleSchema } from "./Evento";
import { reminderSchema } from "./Remiders";

//de lectura de una actividad 
export const PreviewSchema = GEventSchema.extend({
  recurrence: z.array(z.string()).optional(), 
  transparency: z.enum(["transparent", "opaque"]).optional(),
  reminders: z.object({ 
    useDefault: z.boolean().default(false),
    overrides: z.array(reminderSchema).optional() 
  }).optional(),
  idEtiqueta: z.number().optional(),
  description: z.string().optional(),
  prioridadValor: z.enum(["alta", "media", "baja"]).optional(),
  source: z.enum(["local", "google"]).optional(),
});

export const SchemaActividad = PreviewSchema.extend({
    status: z.enum(["confirmed", "tentative", "cancelled"]).optional(),
    created: z.string().optional(), 
    updated: z.string().optional(), 
    eventType: z.enum(["default", "focusTime", "outOfOffice"]).optional(),
    recurringEventId: z.string().optional(),        
    originalStartTime: GoogleSchema.optional()
});


export type lecturaActividad = z.infer <typeof SchemaActividad>;
export type MiniModal = z.infer <typeof PreviewSchema>;