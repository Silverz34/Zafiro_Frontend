import { z } from "zod";

export const GoogleSchema= z.object({
    dateTime: z.string().optional(),
    date: z.string()
})

export const GEventSchema = z.object(
    {
        id: z.string(),
        summary: z.string().optional(),
        start: GoogleSchema,
        end: GoogleSchema
    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>

