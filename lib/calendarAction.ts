// actions/calendarActions.ts
"use server";
import { getGoogleToken } from "./googleAuth";

export async function fetchDailyActivities() {
  try {
    const token = await getGoogleToken();
    const googleApiUrl = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
    googleApiUrl.searchParams.append("timeMin", new Date().toISOString());
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