"use server";

import { getGoogleToken } from "./googleAuth";

export async function deleteActividad(id: string) {
  try {
    const token = await getGoogleToken();

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status !== 204) {
      const errorData = await res.json();
      console.error("Error en Google Calendar API:", errorData);
      throw new Error("Error al eliminar la actividad");
    }
    return { success: true };

  } catch (error) {
    console.error("Error en deleteActividad:", error);
    return { success: false, error: "No se pudo eliminar la actividad" };
  }
}