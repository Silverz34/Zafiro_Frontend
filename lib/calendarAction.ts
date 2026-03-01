"use server";
import { getGoogleToken } from "./googleAuth";
import { SchemaActividad, Actividad } from "../interfaces/Actividad";

export async function fetchDailyActivities(targetDateIso: string) {
  try {
    const token = await getGoogleToken();
    const targetDate = new Date(targetDateIso);

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const timeMin = new Date(year, month, 1);
    const timeMax = new Date(year, month + 1, 0)

    timeMin.setDate(timeMin.getDate()-10);
    timeMax.setDate(timeMax.getDate() + 10 );
    timeMin.setHours(0,0,0,0);
    timeMax.setHours(23,59,59,999);

    const googleApiUrl = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
    
    googleApiUrl.searchParams.append("timeMin", timeMin.toISOString());
    googleApiUrl.searchParams.append("timeMax", timeMax.toISOString());

    googleApiUrl.searchParams.append("singleEvents", "true"); 
    googleApiUrl.searchParams.append("orderBy", "startTime"); 
    googleApiUrl.searchParams.append("maxResults", "1000");
    
    const res = await fetch(googleApiUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error("Error al consultar la API de Google");
    }

    const data = await res.json();
    return data.items;

  } catch (error) {
    console.error("Error obteniendo los eventos del calendario:", error);
    return null;
  }
}

export async function createGoogleActivity(rawData:unknown){
  try{
    const validation: Actividad = SchemaActividad.parse(rawData);
    const token = await getGoogleToken();
    const googleApiUrl = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
    const res = await fetch(googleApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validation),
    });
     
    if(!res.ok){
      const errorData = await res.json();
      console.error("error en la api", errorData);
      throw new Error("fallo el tratar de insertar la actividad");
    }
    const createdEvent = await res.json();
    return{succes: true, data: createdEvent};
  }catch (error){
    console.error("Error en createGoogleActivity:", error);
    return { success: false, error: "Error al crear la actividad." };
  }
}