import z from "zod";
export const reminderSchema = z.object({
    method: z.literal("email"), 
    minutes: z.number().min(0).max(40320)
});

