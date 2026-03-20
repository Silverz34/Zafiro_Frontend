import { z } from "zod";

export const SchemaAjustes = z.object({
  id: z.string().uuid(),
  id_usuario: z.string().uuid(),
  ocupacion: z.string(),
  hora_inicio: z.number(),
  hora_fin: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Ajustes = z.infer<typeof SchemaAjustes>