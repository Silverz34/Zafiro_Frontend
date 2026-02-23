import { z } from "zod";

export const GEventSchema = z.object(
    {
        id: z.string(),
        summary: z.string(),
        start: z.object({
            dateTime: z.string(),
            date: z.string(),
        }),
        end: z.object({
            dateTime: z.string(),
            date: z.string()
        }),

    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>

