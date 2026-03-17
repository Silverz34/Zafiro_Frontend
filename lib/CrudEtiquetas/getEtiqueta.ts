
import { apiGet } from "../api/apiClient";
import { auth } from "@clerk/nextjs/server";

export type EtiquetaFrontend = {
  id: string;
  label: string;
  color: string;
};

export async function getEtiquetas() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error('Usuario no autenticado');
    const response = await apiGet<any[]>(`/api/tags/user/${userId}`);

    if (response.success && response.data) {
      const etiquetasMapeadas: EtiquetaFrontend[] = response.data.map((tag: any) => ({
        id: tag.id,
        label: tag.etiqueta, // Mapeo clave
        color: tag.color
      }));
      return { success: true, data: etiquetasMapeadas };
    }
    return { success: false, error: 'No se pudieron obtener las etiquetas' };

  } catch (error) {
    console.error('[getEtiquetas] Error:', error);
    return { success: false, error: 'Error interno al cargar etiquetas' };
  }
}