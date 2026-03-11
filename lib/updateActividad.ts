'use server';

import { getGoogleToken } from "./googleAuth";

export async function updateActividad(id: string, cambios: Record<string, unknown>) {
  try {
    const token = await getGoogleToken();

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization:  `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cambios),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error en Google Calendar API:", errorData);
      throw new Error("Error al actualizar la actividad");
    }

    const updated = await res.json();
    return { success: true, data: updated };

  } catch (error) {
    console.error("Error en updateActividad:", error);
    return { success: false, error: "No se pudo actualizar la actividad" };
  }
}