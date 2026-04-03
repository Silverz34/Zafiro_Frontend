import z from "zod";

export const SchemaAlgoritmo = z.object({
  hora_inicio: z.string(),
  hora_fin: z.string(),
  dias_contemplados: z.number().min(3).max(15),
  gap: z.number(),
  long_first: z.boolean(),
  idEtiqueta: z.number().optional(),
});

export type Algoritmo = z.infer<typeof SchemaAlgoritmo>;ñ