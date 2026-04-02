import { GoogleEvent } from "../Evento";
import { lecturaActividad, MiniModal } from "../Preview";

export interface ViewProps {
    currentDate: Date;
    isLoading: boolean;
    events: lecturaActividad[];
    onOpenModal: () => void;
    onEventClick: (evento: MiniModal) => void;
}