import { z } from "zod";
import { reminderSchema } from "./Remiders";

export const GoogleSchema= z.object({
  dateTime: z.string().optional(),
  date: z.string().optional(),
  timeZone: z.string().optional(),
}).refine(
  data => data.dateTime || data.date,
  { message: "Se requiere dateTime o date" }
);

export const GEventSchema = z.object(
    {
      summary: z.string().min(2, "El título es obligatorio"),
      start: GoogleSchema,
      end: GoogleSchema
    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>

//es para el mini modal (preview de la actividad)
export const PreviewSchema = GEventSchema.extend({
  id: z.string(),
  transparency: z.enum(["transparent", "opaque"]).optional(),
   reminders: z.object({ 
      useDefault: z.boolean(),
      overrides: z.array(reminderSchema).optional() 
    }).optional()
});

export type MiniModal = z.infer <typeof PreviewSchema>;

