
import { z } from "zod";

//creacion de ajustes 
export const SchemaAjustes = z.object({
  ocupacion: z.string(),
  hora_inicio: z.string(),
  hora_fin: z.string(),
})

//lectura
export const SchemaAjust = z.object({
  id: z.string(),
  ocupacion: z.string(),
  hora_inicio: z.string(),
  hora_fin: z.string(),
})

export type Ajustes = z.infer<typeof SchemaAjustes>
export type Ajustlectura= z.infer<typeof SchemaAjust>