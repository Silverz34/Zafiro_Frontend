import { z } from "zod";

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
      id: z.string().optional(),
      summary: z.string().min(2, "El título es obligatorio"),
      start: GoogleSchema,
      end: GoogleSchema
    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>

