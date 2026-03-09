import { z } from "zod";

export const GoogleSchema= z.object({
    dateTime: z.string().optional(),
    date: z.string().optional()
})

export const GEventSchema = z.object(
    {
        id: z.string(),
        summary: z.string(),
        start: GoogleSchema,
        end: GoogleSchema
    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>

