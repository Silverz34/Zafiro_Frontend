import { GoogleEvent } from "../Evento";
import { MiniModal } from "../Preview";

export interface ViewProps {
    currentDate: Date;
    events: GoogleEvent[];
    onOpenModal: () => void;
    onEventClick: (evento: MiniModal) => void;
}