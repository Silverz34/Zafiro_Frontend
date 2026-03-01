


export type TipoOcurrencia = 'none' | 'daily' | 'weekdays' | 'weekly';

export function generarReglaOcurrencia(fechaInicioISO: string, tipo: TipoOcurrencia): string[] | undefined {
  if (tipo === 'none') return undefined;

  const startDate = new Date(fechaInicioISO);
  const untilDate = new Date(startDate);
  untilDate.setMonth(untilDate.getMonth() + 1);
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const formattedUntil = 
    `${untilDate.getUTCFullYear()}` +
    `${pad(untilDate.getUTCMonth() + 1)}` + 
    `${pad(untilDate.getUTCDate())}T` +
    `${pad(untilDate.getUTCHours())}` +
    `${pad(untilDate.getUTCMinutes())}` +
    `${pad(untilDate.getUTCSeconds())}Z`;

  switch (tipo) {
    case 'daily':
      return [`RRULE:FREQ=DAILY;UNTIL=${formattedUntil}`];
    case 'weekdays':
      return [`RRULE:FREQ=WEEKLY;UNTIL=${formattedUntil};BYDAY=MO,TU,WE,TH,FR`];
    case 'weekly':
      return [`RRULE:FREQ=WEEKLY;UNTIL=${formattedUntil}`];
    default:
      return undefined;
    }
}