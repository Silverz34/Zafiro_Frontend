export type TipoOcurrencia = 'none' | 'daily' | 'weekdays' | 'weekly';

/**
 * Calcula la fecha UNTIL (1 mes después del inicio)
 * con fix de overflow: si el mes siguiente no tiene ese día,
 * retrocede al último día del mes.
 */
export function calcularUntil(fechaInicioISO: string): string{
  const startDate = new Date(fechaInicioISO);

  const year = startDate.getUTCFullYear();
  const month = startDate.getUTCMonth()
  const day = startDate.getUTCDate();
 
  const ultimoDia = new Date(Date.UTC(year, month + 2, 0 )).getUTCDate();
  const diaFinal = Math.min(day, ultimoDia);
  const until = new Date(Date.UTC(year, month + 1,diaFinal ));
  const pad = (n:number)=> n.toString().padStart(2, '0');

  return(
    `${until.getUTCFullYear()}` +
    `${pad(until.getUTCMonth() + 1)}` +
    `${pad(until.getUTCDate())}` +
    `T000000Z`
  );
}



/**
 * Regla de RRULE para google calendar 
 * las repeticiones tienen limite de un mes para evitar ocurrencias infinitas 
 * retorna udefined si el tipo es 'none'
 */

export function generarRegla(
  fechaInicioISO: string,
  tipo: TipoOcurrencia
): string[] | undefined {
  if (tipo === 'none') return undefined;

  const until = calcularUntil(fechaInicioISO);

  switch (tipo) {
    case 'daily':
      return [`RRULE:FREQ=DAILY;UNTIL=${until}`];

    case 'weekdays':
      return [`RRULE:FREQ=WEEKLY;UNTIL=${until};BYDAY=MO,TU,WE,TH,FR`];

    case 'weekly':
      return [`RRULE:FREQ=WEEKLY;UNTIL=${until}`];

    default:
      return undefined;
  }
}