import {z} from "zod";

export const SchemaEtiqueta= z.object({
 etiqueta: z.string(), 
 color: z.string(),    
});

export const extras_dict  = z.object({
    prioridad: z.enum(["Alta", "Media", "Baja"]),
    color: z.string
});

export type etiquetas = z.infer <typeof SchemaEtiqueta>
export type prioridades = z.infer <typeof extras_dict>

