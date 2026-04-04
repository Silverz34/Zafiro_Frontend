import { AlgorithmResponse, Config } from "../../../interfaces/Algorithm"
import { apiGet, apiPost } from "../../../lib/sincronizacion/apiClient"
import { ApiError } from "../../../lib/sincronizacion/apiError"

export class algorithmHook {
    public async verifyAlgorithm():Promise<boolean | null>{
        try {
            const response = await apiGet<any>("/api/algorithm/health")
            if (!response.success){
                console.error('[algorithmHealthCheck] Error al verificar el estado del algoritmo.')
                return null
            }
            console.log(response.data)
            return response.data ? true : false

        } catch (error) {
            if (error instanceof ApiError) {
                console.error(`[algorithmHealthCheck] Error ${error.status}:`, error.message)
            } else {
                console.error('[algorithmHealthCheck] Error inesperado:', error)
            }
            return null
        }
    }

    public async sortAgenda():Promise<AlgorithmResponse | null>  {
        const mockData:Config = {
                tiempo_descanso:{
                    inicio:"22:00",
                    fin:"8:00"
                },
                dias_contemplados:7,
                gap:30,
                long_first: false
            }
        try {
            const response = await apiPost<AlgorithmResponse>(
                '/api/algorithm/sort',
                mockData
            )
            if (!response.success){
                console.error('[algorithmSort] Error al reordenar las actividades.')
                return null
            }
            console.log(response.data)
            return response.data
        }  catch (error) {
            if (error instanceof ApiError) {
            console.error(`[algorithmSort] Error ${error.status}:`, error.message)
            } else {
            console.error('[algorithmSort] Error:', error)
            }
            return null
        }
    }
}