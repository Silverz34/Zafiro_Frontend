export type PrioridadType = "Alta" | "Media" | "Baja";

export type ModoModal= "crear" | "editar";

export const PRIORIDADES = [
  { nivel: "Baja"  as PrioridadType, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/40" },
  { nivel: "Media" as PrioridadType, color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/40"   },
  { nivel: "Alta"  as PrioridadType, color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/40"    },
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