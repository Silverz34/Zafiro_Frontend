

export function getCalendarViewRange(baseDate: Date) {
  const year = baseDate.getFullYear()
  const month = baseDate.getMonth()

  // Inicio de la cuadrícula: domingo de la semana del primer día del mes
  const firstOfMonth = new Date(year, month, 1)
  const startDayOfWeek = firstOfMonth.getDay()
  const gridStart = new Date(year, month, 1 - startDayOfWeek)
  gridStart.setHours(0, 0, 0, 0)

  // La cuadrícula visual son 42 días (6 semanas)
  // Se agrega 1 semana extra (49 días) para capturar ocurrencias
  // que empiezan en los últimos días del mes y continúan en el siguiente
  const gridEnd = new Date(gridStart)
  gridEnd.setDate(gridStart.getDate() + 48) // 42 días visibles + 7 de margen
  gridEnd.setHours(23, 59, 59, 999)

  return {
    timeMin: gridStart.toISOString(),
    timeMax: gridEnd.toISOString(),
  }
}