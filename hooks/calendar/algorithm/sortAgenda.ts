import { algorithmPost, apiGet, apiPost } from "../../../lib/sincronizacion/apiClient"
import { ApiError } from "../../../lib/sincronizacion/apiError"

interface RangoTiempo {
    inicio: string
    fin: string
}

interface DateDict {
    date?: string
    dateTime?: string
    timeZone?: string
}

interface ReminderOverride {
    method: 'popup' | 'email'
    minutes: number
}

interface ReminderDict {
    useDefault: boolean
    overrides?: ReminderOverride[]
}

interface EtiquetaDict {
    etiqueta: number
    color: string
}

interface ExtrasDict {
    prioridad: 'baja' | 'media' | 'alta'
    etiquetas: EtiquetaDict
}

interface Agenda {
    id: string
    summary: string
    start: DateDict
    end: DateDict

    recurringEventId?: string
    originalStartTime?: string

    transparency: 'transparent' | 'opaque'
    reminders: ReminderDict

    extras: ExtrasDict
}

interface Config {
    tiempo_descanso: RangoTiempo
    dias_contemplados: number
    gap: number
    long_first: boolean
}

interface ActividadesResponse {
    defaultReminders: ReminderOverride[]
    items: Agenda[]
}

interface AlgorithmActivities {
    config: Config
    calendar: ActividadesResponse
}

interface AlgorithmResponse {
    status: string
    code: number
    tareas_agendadas: Agenda[]
    tareas_no_agendadas: Agenda[]
}

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
        try {
            const response = await algorithmPost<AlgorithmResponse>(
                'prueba'
            )
            if (!response.success){
                console.error('[algorithmSort] Error al reordenar las actividades.')
                return null
            }
            console.log(response)
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