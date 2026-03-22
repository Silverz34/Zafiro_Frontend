
export type ColorSemaforo = 'rojo' | 'naranja' | 'verde' | 'normal';

export const calcularSemaforo = (eventosDelDia: any[]): ColorSemaforo => {
  if (!eventosDelDia || eventosDelDia.length === 0) return 'normal';

  let countMasDe1Hora = 0;
  let countMasDe2Horas = 0;

  for (const evento of eventosDelDia) {
    if (!evento.start || !evento.end) continue;

    const inicio = new Date(evento.start.dateTime || evento.start).getTime();
    const fin = new Date(evento.end.dateTime || evento.end).getTime();
    const duracionMinutos = (fin - inicio) / (1000 * 60);
    if (duracionMinutos > 120) {
      countMasDe2Horas++;
      countMasDe1Hora++;
    } else if (duracionMinutos > 60) {
      countMasDe1Hora++;
    }
  }

  if (countMasDe2Horas > 3) return 'rojo';
  if (countMasDe1Hora >= 3) return 'naranja';
  if (eventosDelDia.length > 0) return 'verde';

  return 'normal';
};