
import { z } from "zod";

//creacion de ajustes 
export const SchemaAjustes = z.object({
  ocupacion: z.string(),
  horaInicio: z.string(),
  horaFin: z.string(),
})

//lectura
export const SchemaAjust = z.object({
  id: z.string,
  ocupacion: z.string(),
  horaInicio: z.string(),
  horaFin: z.string(),
})

export type Ajustes = z.infer<typeof SchemaAjustes>
export type Ajustlectura= z.infer<typeof SchemaAjust>