
export const TAG_COLORS = [
  { hex: '#6366F1', nombre: 'Índigo'   },
  { hex: '#0891B2', nombre: 'Cian'     },
  { hex: '#DB2777', nombre: 'Rosa'     },
  { hex: '#7C3AED', nombre: 'Violeta'  },
  { hex: '#D97706', nombre: 'Ámbar'    },
  { hex: '#0D9488', nombre: 'Teal'     },
] as const
 
export type TagColor = typeof TAG_COLORS[number]['hex']