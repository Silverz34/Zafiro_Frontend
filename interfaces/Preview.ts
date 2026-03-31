import z from "zod";
import { GEventSchema, GoogleSchema } from "./Evento";
import { reminderSchema } from "./Remiders";
import { SchemaEtiqueta } from "./Etiquetas";

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
  source: z.literal("local").optional(),
});

export const SchemaActividad = PreviewSchema.extend({
  etiqueta: z.object({                             
    id: z.number(),
    nombre: z.string().nullable().optional(),
    color: z.string().nullable().optional(),
  }).nullable().optional(),
  localId: z.string().nullable().optional(),      
  status: z.enum(["confirmed", "tentative", "cancelled"]).optional(),
  created: z.string().optional(), 
  updated: z.string().optional(), 
  eventType: z.enum(["default", "focusTime", "outOfOffice"]).optional(),
  recurringEventId: z.string().optional(),        
  originalStartTime: GoogleSchema.optional()
});


export type lecturaActividad = z.infer <typeof SchemaActividad>;
export type MiniModal = z.infer <typeof PreviewSchema>;