'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface TimeSlot{
    label: string;
    value: string;
}

export const TIME_SLOTS: TimeSlot[] = Array.from({ length: 96 }, (_, i) => {
  const totalMinutes = i * 15;
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 < 12 ? "am" : "pm";
  const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
  const label = `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  const value = `${hours24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  return { label, value };
});

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  minTime?: string;   
  placeholder?: string;
}

export function TimePicker({ value, onChange, minTime, placeholder = "Selecciona hora" }: TimePickerProps) {
  const availableSlots = minTime
    ? TIME_SLOTS.filter(slot => slot.value > minTime)
    : TIME_SLOTS;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="flex-1 bg-[#0d0c1e] border-[#2a2948] text-white text-sm h-9 rounded-lg focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="bg-[#111029] border-blue-600 text-white rounded-xl shadow-xl shadow-black/60 overflow-hidden p-0 w-(--radix-select-trigger-width)"
      >
        <div className="overflow-y-auto max-h-36 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
          {availableSlots.map(slot => (
            <SelectItem
              key={slot.value}
              value={slot.value}
              className="text-sm text-gray-300 focus:bg-blue-600/20 focus:text-white rounded-none cursor-pointer"
            >
              {slot.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}