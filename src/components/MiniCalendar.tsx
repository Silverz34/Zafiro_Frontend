'use client';
import React, { useState } from 'react';

export default function MiniCalendar() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const years = Array.from({ length: 11 }, (_, i) => year - 5 + i);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCurrentDate(new Date(year, parseInt(e.target.value), 1));
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => setCurrentDate(new Date(parseInt(e.target.value), month, 1));

  const today = new Date();

  return (
    <div className="bg-[#171733] p-4 rounded-xl text-white w-full max-w-70 max-h-70">
      
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-blue-600 hover:text-white px-2 py-1 rounded transition-colors">&lt;</button>
        
        <div className="flex gap-2">
          <select 
            value={month} 
            onChange={handleMonthChange}
            className="bg-[#171733] border border-gray-500 text-sm rounded px-2 py-1 outline-none cursor-pointer"
          >
            {monthNames.map((m, index) => (
              <option key={m} value={index}>{m}</option>
            ))}
          </select>
          <select 
            value={year} 
            onChange={handleYearChange}
            className="bg-[#171733] border border-gray-500 text-sm rounded px-2 py-1 outline-none cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <button onClick={handleNextMonth} className="text-blue-600 hover:text-white px-2 py-1 rounded transition-colors">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-[10px] text-blue-500 font-bold text-center uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="p-1"></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

          return (
            <button
              key={day}
              className={`text-xs rounded w-7 h-7 mx-auto flex items-center justify-center transition-colors
                ${isToday ? ' border border-blue-600 text-white font-bold' : 'text-gray-300 hover:bg-gray-800'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}