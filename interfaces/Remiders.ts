import z from "zod";
export const reminderSchema = z.object({
    method: z.enum(['email', 'popup']), 
    minutes: z.number().min(0).max(40320)
});

