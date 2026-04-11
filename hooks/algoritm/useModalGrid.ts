import { useState, useMemo } from 'react'
import type { Agenda } from '../../interfaces/Algorithm';
import { PRIORIDADES } from '../custom/modalconstantes';

export const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function formatearRango(inicio: string, fin: string): string {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString("es-MX", {
      hour:   "2-digit",
      minute: "2-digit",
    })
  return `${fmt(inicio)} – ${fmt(fin)}`
}

export function useAgendaGrid(tareas: Agenda[]) {
  // 1. Cálculo de fecha inicial
  const initialDate = useMemo(() => {
    if (!tareas || tareas.length === 0) return new Date();
    const firstTaskDate = tareas[0].start.dateTime || tareas[0].start.date;
    return firstTaskDate ? new Date(firstTaskDate) : new Date();
  }, [tareas]);

  const [currentDate, setCurrentDate] = useState(initialDate);

  // 2. Generación de días a mostrar
  const daysToShow = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => {
      const d = new Date(currentDate);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [currentDate]);

  // Navegación
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 3);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 3);
    setCurrentDate(newDate);
  };

  // Filtrado de tareas por día
  const getTasksForDay = (date: Date) => {
    if (!tareas) return [];
    return tareas.filter(tarea => {
      const taskDate = tarea.start.dateTime || tarea.start.date;
      if (!taskDate) return false;
      const d = new Date(taskDate);
      return d.toDateString() === date.toDateString();
    });
  };

  //Cálculos matemáticos de posición y estilos
  const getTaskStyle = (tarea: Agenda) => {
    if (!tarea.start.dateTime || !tarea.end.dateTime) return { top: 0, height: '64px' };
    
    const start = new Date(tarea.start.dateTime);
    const end = new Date(tarea.end.dateTime);
    
    const startMinutes = (start.getHours() * 60) + start.getMinutes();
    const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

    const top = (startMinutes / 60) * 64;
    const height = Math.max((durationMinutes / 60) * 64, 24); 

    const tagColor = tarea.extras?.etiquetas?.color;
    const prioridadObj = PRIORIDADES.find(p => p.nivel === tarea.extras?.prioridad);
    
    const dynamicCardStyle = tagColor 
      ? { backgroundColor: `${tagColor}33`, borderColor: tagColor } 
      : { backgroundColor: 'rgba(55, 65, 81, 0.3)', borderColor: '#4b5563' };
      
    const dynamicBarStyle = prioridadObj 
      ? { backgroundColor: prioridadObj.hexColor } 
      : (tagColor ? { backgroundColor: tagColor } : { backgroundColor: '#4b5563' });

    return { 
      cardStyle: { top: `${top}px`, height: `${height}px`, ...dynamicCardStyle },
      barStyle: dynamicBarStyle
    };
  };

  return {
    daysToShow,
    handlePrev,
    handleNext,
    getTasksForDay,
    getTaskStyle
  };
}