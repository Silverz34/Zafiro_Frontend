// actions/calendarActions.ts
"use server";
import { getGoogleToken } from "./googleAuth";

export async function fetchDailyActivities() {
  try {
    const token = await getGoogleToken();
    const googleApiUrl = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
    const startOfWeek = new Date()
    startOfWeek.setDate(startOfWeek.getDate()-startOfWeek.getDay());
    startOfWeek.setHours(0,0,0,0);
    googleApiUrl.searchParams.append("timeMin", startOfWeek.toISOString());

    googleApiUrl.searchParams.append("singleEvents", "true");
    googleApiUrl.searchParams.append("orderBy", "startTime");
    
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