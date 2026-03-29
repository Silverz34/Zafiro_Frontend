
export function getMonthBoundaries(baseDate: Date) {
  const firstDay = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);

  const lastDay = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0, 23, 59, 59);
  return {
    timeMin: firstDay.toISOString(),
    timeMax: lastDay.toISOString()
  };
}