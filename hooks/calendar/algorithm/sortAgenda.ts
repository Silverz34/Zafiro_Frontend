import { AgendaArray, AgendaArrayType, AlgorithmRequest, AlgorithmResponse, Config, ConfigType } from "../../../interfaces/Algorithm"
import { lecturaActividad } from "../../../interfaces/Preview"
import { fetchGoogleEvents } from "../../../lib/CrudActividad/fetchActividad"
import { apiGet, apiPost } from "../../../lib/sincronizacion/apiClient"
import { ApiError } from "../../../lib/sincronizacion/apiError"

export class algorithmHook {
    private createDates(limit: number): { today: string, end: string } {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()
        const currentDay = today.getDay()
        console.log(today.toISOString(), currentYear, currentMonth, currentDay)
        const end = new Date(currentYear, currentMonth, currentDay + limit)

        const todayStr = today.toISOString()
        const endStr = end.toISOString()
        
        return { today:todayStr, end:endStr }
    }

    private parseActivities(activities: lecturaActividad[] ): AgendaArray {
        if (activities.length == 0) {
            return []
        }
        const activitiesParsed:AgendaArray = activities.map((act) => {
            return {
                id: act.id,
                summary: act.summary,
                start: act.start,
                end: act.end,
                transparency: act.transparency ?? 'opaque',
                reminders: act.reminders ?? { useDefault: true },
                extras: {
                    prioridad: act.prioridadValor ?? 'media',
                    etiquetas: {
                        etiqueta: act.etiqueta?.id ?? 0,
                        color: act.etiqueta?.color ?? '#555555'
                    }
                }
            }
        })
        return activitiesParsed
    }

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

    public async sortAgenda(data: object):Promise<AlgorithmResponse | null>  {
        try {
            const configParsed: Config = ConfigType.parse(data)
            console.log(configParsed)

            const { today, end } = this.createDates(configParsed.dias_contemplados)
            const activities: lecturaActividad[] = await fetchGoogleEvents(today,end) ?? []
            console.log(today, end, activities)
            const activitiesParsed: AgendaArray = this.parseActivities(activities)
            if (activitiesParsed.length == 0) {
                console.error("[algorithmSort] No se recibieron actividades")
                return null
            }

            const payload: AlgorithmRequest = {
                config: configParsed,
                calendar: {
                    defaultReminders: [{
                        method: 'email',
                        minutes: 15
                    }],
                    items: activitiesParsed
                }
            }
            console.log(payload)
            
            const response = await apiPost<AlgorithmResponse>(
                '/api/algorithm/sort',
                payload
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