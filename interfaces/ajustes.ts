import { X } from "lucide-react";
import { z } from "zod";

//creacion de ajustes 
export const SchemaAjustes = z.object({
  id: z.string(),
  ocupacion: z.string(),
  hora_inicio: z.number(),
  hora_fin: z.number(),
})

//lectura
export const SchemaAjust = z.object({
  id: z.string,
  ocupacion: z.string(),
  hora_inicio: z.number(),
  hora_fin: z.number(),
})

export type Ajustes = z.infer<typeof SchemaAjustes>
export type Ajustlectura= z.infer<typeof SchemaAjust>