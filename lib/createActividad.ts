'use server';

import { getGoogleToken } from "./googleAuth";
import { SchemaCrearActividad } from "../interfaces/Actividad";
import { generarRegla } from "../hooks/Ocurrencia";
import { FormActividad } from "./types/FormActividad";

const PRIORIDAD_COLORES: Record <string, string> = {
  Alta:  "#AB3535",
  Media: "#E2761F",
  Baja:  "#2FA941",
};

export async function createActividad(form: FormActividad) {
    try{
        const StartISO = form.isAllDay 
        ? undefined : `${form.fecha}T${form.horaInicio}:00`; 

        const endISO = form.isAllDay
        ? undefined :  `${form.fecha}T${form.horaFin}:00`; 

        const payload ={
            summary: form.titulo,
            start: form.isAllDay
            ? {date: form.fecha} : {dateTime: StartISO},
            end: form.isAllDay
            ? {date: form.fecha} : {dateTime: endISO},

            transparency: form.ocupacion === "transparent" ? "transparent" : undefined,

            recurrence: generarRegla(
                StartISO ?? `${form.fecha}T00:00:00`,
                form.recurrencia
            ),
            remiders: form.remider === "none"
            ? {useDefault: false} : {
                useDefault: false,
                overrides: [{
                    method: "popup", 
                    minutes: parseInt(form.remider),
                }],
            },
            prioridad: {
                Prioridad: form.prioridad,
                color: PRIORIDAD_COLORES[form.prioridad],
            }
        };

        //validar con el squema de zod antes de enviar
        const validate = SchemaCrearActividad.parse(payload);
        const token = await getGoogleToken();
       const res = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
                method: "POST",
                headers: {
                Authorization:  `Bearer ${token}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify(validate),
            }
        );

        if(!res.ok){
            const errorData = await res.json();
            console.error("Error en Google calendar API: ", errorData);
            throw new Error("Error al crear la actividad en Google Calendar");
        }
        const created = await res.json();
        return { success: true, data: created };
    } catch (error) {
        console.error("Error en createActividad:", error);
        return { success: false, error: "No se pudo crear la actividad" };
    }
    
}