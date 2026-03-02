import { useCallback } from "react";
import { ViewType } from "./calendar";

export function useCalendarNavigation(currentDate: Date, setCurrentDate: (date: Date) => void, currentView: ViewType) {

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, [setCurrentDate]);

  const goToPrevious = useCallback(() => {
    const newDate = new Date(currentDate);
    if(currentView === 'dia'){
      newDate.setDate(currentDate.getDate()- 1);
    }else if (currentView === 'semana'){
      newDate.setDate(currentDate.getDate()-7);
    }else if (currentView == 'mes'){
      newDate.setMonth(currentDate.getMonth()-1);
    }
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate, currentView]);

  const goToNext= useCallback(() => {
    const newDate = new Date(currentDate);
    if (currentView === 'dia') {
      newDate.setDate(currentDate.getDate() - 1);
    } else if (currentView === 'semana') {
      newDate.setDate(currentDate.getDate() - 7);
    } else if (currentView === 'mes') {
      newDate.setMonth(currentDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  }, [currentDate, setCurrentDate, currentView]);

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
    goToPrevious,
    goToNext,
    handleYearChange,
    formattedMonth,
    currentYear,
    yearsRange
  };
}