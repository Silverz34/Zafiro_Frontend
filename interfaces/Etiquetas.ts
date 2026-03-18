import { z } from "zod";

export const SchemaEtiqueta = z.object({
    nombre: z.string(), 
    color: z.string(),    
});

export const extras_dict = z.object({
    nombre: z.enum(["Alta", "Media", "Baja"]),
    color: z.string() 
});

export type Etiquetas = z.infer<typeof SchemaEtiqueta>;
export type Prioridades = z.infer<typeof extras_dict>;