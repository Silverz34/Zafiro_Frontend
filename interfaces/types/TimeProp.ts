
export interface TimeRangePickerProps {
  horaInicio:       string
  horaFin:          string
  onChangeInicio:   (val: string) => void
  onChangeFin:      (val: string) => void
  labelInicio?:     string
  labelFin?:        string
}