
export interface TimeSlot {
  value: string; 
  label: string;
}

export const generarHorarios = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  
  for (let hora = 0; hora < 24; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 15) {
      const horaStr = hora.toString().padStart(2, '0');
      const minStr = minuto.toString().padStart(2, '0');
      const valorParaAPI = `${horaStr}:${minStr}`;
  
      //visulizacion en su select 
      const ampm = hora < 12 ? "am" : "pm";
      const horaVisual = hora === 0 ? 12 : hora > 12 ? hora - 12 : hora;
      const labelVisual = `${horaVisual}:${minStr} ${ampm}`;
      
      slots.push({
        value: valorParaAPI,
        label: labelVisual,
      });
    }
  }
  return slots;
};

export const HORARIOS_COMPLETOS = generarHorarios();

//filtrado con restriccion 
export const obtenerHorasFin = (valorInicio: string): TimeSlot[] => {
  const indexInicio = HORARIOS_COMPLETOS.findIndex(h => h.value === valorInicio);
  if (indexInicio === -1) return HORARIOS_COMPLETOS;

  const slotsFin: TimeSlot[] = [];
  const total = HORARIOS_COMPLETOS.length;
  
  for (let i = 1; i < total; i++) {
    slotsFin.push(HORARIOS_COMPLETOS[(indexInicio + i) % total]);
  }
  return slotsFin;
};