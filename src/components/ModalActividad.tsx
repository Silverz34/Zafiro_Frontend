'use client'

import React, {useState} from "react";
import { HiX, HiOutlineClock, HiOutlineCalendar, HiOutlineRefresh, HiOutlineFlag, HiOutlineBell } from "react-icons/hi";

interface modalProps{
    isOpen: boolean;
    onClose: () => void;
}

export default function ModalActividad({isOpen, onClose}: modalProps){
    const[isAllDay, setIsAllDay] = useState(false);
    const[prioridad, setPrioridad] = useState<'Alta' | 'Media' | 'Baja'>('Media');

    if(!isOpen) return null;
    return(<div className="fixed inset-0 z-100 flex items-center justify-center bg-[#010112]/80 backdrop-blur-sm p-4">
      
            <div className="bg-[#100F1D] w-full max-w-lg rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
                
                <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-[#0b0a14]">
                    <h2 className="text-xl font-bold text-white tracking-wide">Nueva Actividad</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded-lg transition-colors"
                    >
                     
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">

                    <div>
                        <input 
                            type="text" 
                            placeholder="Añade un título o resumen..." 
                            className="w-full bg-transparent border-b-2 border-gray-800 focus:border-blue-600 text-2xl text-white placeholder-gray-500 py-2 outline-none transition-colors"
                        />
                    </div>


                    <div className="flex flex-col gap-4 bg-gray-900/30 p-4 rounded-xl border border-gray-800/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                Horario
                            </span>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <span className="text-xs text-gray-400">Todo el día</span>
                                <input 
                                    type="checkbox" 
                                    checked={isAllDay}
                                    onChange={() => setIsAllDay(!isAllDay)}
                                    className="toggle toggle-info toggle-sm" 
                                />
                            </label>
                        </div> 

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-8">De</span>
                            <input type="date" className="flex-1 bg-[#010112] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                            {!isAllDay && (
                                <input type="time" className="w-28 bg-[#010112] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-8">Hasta</span>
                            <input type="date" className="flex-1 bg-[#010112] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                            {!isAllDay && (
                                <input type="time" className="w-28 bg-[#010112] border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 ml-1">🔁 Repetición</label>
                            <select className="bg-[#010112] border border-gray-800 text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 appearance-none">
                                <option value="none">No se repite</option>
                                <option value="daily">Cada día</option>
                                <option value="weekly">Cada semana</option>
                                <option value="monthly">Cada mes</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400 ml-1"> Aviso</label>
                            <select className="bg-[#010112] border border-gray-800 text-white text-sm rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 appearance-none">
                                <option value="default">Por defecto (10 min)</option>
                                <option value="30">30 minutos antes</option>
                                <option value="60">1 hora antes</option>
                                <option value="none">Sin recordatorio</option>
                            </select>
                        </div>
                    </div>

             
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-gray-400 ml-1">🚩 Prioridad</label>
                        <div className="flex gap-2">
                            {(['Baja', 'Media', 'Alta'] as const).map((nivel) => (
                                <button
                                    key={nivel}
                                    onClick={() => setPrioridad(nivel)}
                                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${
                                        prioridad === nivel 
                                            ? nivel === 'Alta' ? 'bg-red-500/20 border-red-500 text-red-400'
                                            : nivel === 'Media' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                                            : 'bg-green-500/20 border-green-500 text-green-400'
                                            : 'bg-transparent border-gray-800 text-gray-500 hover:border-gray-600'
                                    }`}
                                >
                                    {nivel}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>


                <div className="flex justify-end gap-3 p-5 border-t border-gray-800 bg-[#0b0a14]">
                    <button 
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        Cancelar
                    </button>
                    <button 
                        className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-900/40 transition-all"
                    >
                        Guardar Actividad
                    </button>
                </div>

            </div>
        </div>
    );
      
}