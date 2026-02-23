import { start } from "repl";
import { z } from "zod";

export const GEventSchema = z.object(
    {
        id: z.string(),
        summary: z.string(),
        creater: z.string(),
        updated: z.string(),
        start: z.object({
            dateTime: z.string(),
            date: z.string(),
        }),
        end: z.object({
            dateTime: z.string(),
            date: z.string()
        }),
        sequence : z.string().optional(),
        
    }
);

export type GoogleEvent = z.infer <typeof GEventSchema>