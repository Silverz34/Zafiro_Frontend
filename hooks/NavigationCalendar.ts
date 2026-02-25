import { useCallback } from "react";

export function useCalendarNavigation(currentDate: Date, setCurrentDate: (date: Date) => void) {
  
  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  const goToPreviousWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  const goToNextWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  const handleYearChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(parseInt(event.target.value));
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate]);

  const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate);
  const formattedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const currentYear = currentDate.getFullYear();

  const yearsRange = Array.from({ length: 7 }, (_, i) => currentYear - 1 + i);

  return {
    goToToday,
    goToPreviousWeek,
    goToNextWeek,
    handleYearChange,
    formattedMonth,
    currentYear,
    yearsRange
  };
}