import { AgendaArray, AlgorithmRequest, AlgorithmResponse, Config, ConfigType } from "../../../interfaces/Algorithm"
import { lecturaActividad } from "../../../interfaces/Preview"
import { fetchGoogleEvents } from "../../../lib/CrudActividad/fetchActividad"
import { apiPost } from "../../../lib/sincronizacion/apiClient"
import { ApiError } from "../../../lib/sincronizacion/apiError"

export class algorithmHook {
    private createDates(limit: number): { today: string, end: string } {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()
        const currentDay = today.getDate()

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

    private verifyActivities(actividades: lecturaActividad[]): boolean {
        /**Verifica que de todas las actividades recibidas al menos una no sea opaca, por que si no, el algoritmo no tiene con qué trabajar */
        let isValid = false
        actividades.forEach((tarea) => {
            if (tarea.transparency == 'transparent') {
                isValid = true
                return
            }
        })
        return isValid
    }

    public async sortAgenda(data: object):Promise<AlgorithmResponse | number>  {
        try {
            const configParsed: Config = ConfigType.parse(data)

            const { today, end } = this.createDates(configParsed.dias_contemplados)
            const activities: lecturaActividad[] = await fetchGoogleEvents(today,end) ?? []

            const activitiesParsed: AgendaArray = this.parseActivities(activities)
            if (activitiesParsed.length == 0) {
                console.error("[algorithmSort] No se recibieron actividades.")
                return 400
            }
            if (!this.verifyActivities(activities)) {
                console.error("[algorithmSort] Todas las actividades recibidas fueron opacas.")
                return 4000
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
            
            const response = await apiPost<AlgorithmResponse>(
                '/api/algorithm/sort',
                payload
            )
            if (!response.success){
                console.error('[algorithmSort] Error al reordenar las actividades.')
                return 500
            }
            console.log(response.data)
            return response.data
        }  catch (error) {
            if (error instanceof ApiError) {
            console.error(`[algorithmSort] Error ${error.status}:`, error.message)
            } else {
            console.error('[algorithmSort] Error:', error)
            }
            return 500
        }
    }

    public async saveChanges(data: AlgorithmResponse):Promise<void> {
        console.log("Supongamos que las estoy guardando")
    }
}