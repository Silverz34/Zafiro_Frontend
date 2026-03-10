import z from "zod";
import { GEventSchema } from "./Evento";
import { reminderSchema } from "./Remiders";

export const PreviewSchema = GEventSchema.extend({
  transparency: z.enum(["transparent", "opaque"]).optional(),
   reminders: z.object({ 
      useDefault: z.boolean(),
      overrides: z.array(reminderSchema).optional() 
    }).optional()
});

export type MiniModal = z.infer <typeof PreviewSchema>;