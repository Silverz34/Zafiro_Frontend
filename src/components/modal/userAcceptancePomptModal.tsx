import { AlgorithmResponse } from "../../../interfaces/Algorithm"

interface AcceptancePromptProps {
    preview: AlgorithmResponse
    onAccept: () => void
    onReject: () => void
}

export default function AcceptancePrompt({
    preview, onAccept, onReject
}:AcceptancePromptProps) {
    return (
        <section>

        </section>
    )
}