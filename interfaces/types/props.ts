import { GoogleEvent } from "../Evento";
import { lecturaActividad, MiniModal } from "../Preview";

export interface ViewProps {
    currentDate: Date;
    events: lecturaActividad[];
    onOpenModal: () => void;
    onEventClick: (evento: MiniModal) => void;
}