'use client'

import React, {useState} from "react";
import { Actividad } from "../interfaces/Actividad";
import { SchemaActividad } from "../interfaces/Actividad";

interface CreateModal{
    isOpen: boolean;
    onClose: ()=> void;
    onSubmit: (actividad: Partial<Actividad>) => void;
}

export default function CreateActividad(){
    const [summary, setSummary] = useState('');
    const [start, setStart] = useState('');
    const [startTime, setStartTime] = useState('');
    const [end, setEnd] = useState('');
    
    const[recurrence, setRecurrence] = useState<'none'|'daily'| 'weekdays'|'weekly'>('none');
    
    //logica de ocurrencias 
    let recurrenceArray: string[] | undefined = undefined;
    switch(recurrence){
        case 'daily':
            recurrenceArray = ["RRULE:FREQ=DAILY;COUNT=30"];
            break;
        case 'weekdays': 
            recurrenceArray= ["RRULE:FREQ=WEEKLY;COUNT=20;BYDAY=MO,TU,WE,TH,FR"];
            break;
        case 'weekly':
            recurrenceArray = ["RRULE:FREQ=WEEKLY;COUNT=4"];
           break;
        case 'none':
            default: 
            recurrenceArray = undefined;
    }

    
}