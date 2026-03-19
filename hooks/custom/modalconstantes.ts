export type PrioridadType = "alta" | "media" | "baja";

export type ModoModal= "crear" | "editar";

export const PRIORIDADES = [
  { nivel: "baja"  as PrioridadType, color: "text-white", bg: "bg-[#2FA941]", border: "border-[#2FA941]", hexColor: "#2FA941" },
  { nivel: "media" as PrioridadType, color: "text-white",   bg: "bg-[#E2761F]",   border: "border-[#E2761F]", hexColor: "#E2761F"   },
  { nivel: "alta"  as PrioridadType, color: "text-white",    bg: "bg-[#AB3535]",    border: "border-[#AB3535]", hexColor: "#AB3535"    },
];

export const RECURRENCE_OPTIONS = [
  { value: "none",     label: "No se repite"          },
  { value: "daily",    label: "Todos los días"         },
  { value: "weekdays", label: "Días laborables (L – V)" },
  { value: "weekly",   label: "Cada semana"            },
];

export const REMINDER_OPTIONS = [
  { value: "none", label: "Sin recordatorio"  },
  { value: "5",    label: "5 minutos antes"   },
  { value: "10",   label: "10 minutos antes"  },
  { value: "30",   label: "30 minutos antes"  },
];

export const OCUPACION = [
  { value: "opaque",      label: "Ocupado" },
  { value: "transparent", label: "Libre"   },
];

export const formatDate = (d: Date) =>
  d.toLocaleDateString("es-MX", {
    weekday: "long", day: "numeric",
    month:   "long", year: "numeric",
  });