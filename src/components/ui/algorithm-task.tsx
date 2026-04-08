import { Agenda } from "../../../interfaces/Algorithm";

interface TaskProps {
    tarea: Agenda
    isScheduled: boolean
}

export default function Task({tarea, isScheduled}: TaskProps) {
    return (
        <div className={`${isScheduled ? 'bg-[#2FA941]' : 'bg-[#AB3535]'} p-3 rounded-2xl my-2`}>
            <p>Tarea: {tarea.summary}</p>
            <div>
                <p>Horario nuevo:</p>
                <p>{tarea.start.date ?? tarea.start.dateTime} - {tarea.end.date ?? tarea.end.dateTime}</p>
            </div>
        </div>
    )
}