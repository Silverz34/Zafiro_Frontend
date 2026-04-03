
import { apiGet, apiPost } from "../sincronizacion/apiClient"
import { ApiError } from "../sincronizacion/apiError"
import { SchemaAlgoritmo, type Algoritmo } from "../../interfaces/algoritmo"



export async function verificarAlgoritmo(): Promise<boolean> {
  try {
    const response = await apiGet<any>("/api/algorithm/health")
    return response.success ?? false
  } catch {
    return false
  }
}

export async function ejecutarAlgoritmo(config: Algoritmo) {
  try {
    const validated = SchemaAlgoritmo.parse(config)
    const response  = await apiPost("/api/algorithm/sort", validated)
    return { success: response.success, data: response.data }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.message }
    }
    return { success: false, error: "Error inesperado" }
  }
}