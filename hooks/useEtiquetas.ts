'use client'

import { useState, useEffect } from "react";
import { getEtiquetas, type EtiquetaFrontend } from "../lib/CrudEtiquetas/getEtiqueta";
import { createEtiqueta } from "../lib/CrudEtiquetas/postEtiqueta";
import { updateEtiqueta } from "../lib/CrudEtiquetas/patchEtiqueta";
import { deleteEtiqueta } from "../lib/CrudEtiquetas/DeleteEtiquetas";

export function useEtiquetas(){
    const [etiquetas, setEtiquetas] = useState<EtiquetaFrontend[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    async function cargarDatos() {
      setLoading(true);
      const respuesta = await getEtiquetas();
      if (respuesta.success && respuesta.data) {
        setEtiquetas(respuesta.data);
      } else {
        setEtiquetas([]);
      }
      setLoading(false);
    }
    cargarDatos();
  }, []);

    const agregarEtiqueta = async (datos: Omit<EtiquetaFrontend, 'id'>) => {
      const respuesta = await createEtiqueta(datos);
      if (respuesta.success && respuesta.data) {
        setEtiquetas(prev => [...prev, respuesta.data as EtiquetaFrontend]);
        return true;
      }else{
        alert("Error al guardar: " + respuesta.error); 
      console.error("Detalle del error:", respuesta);
      return false;
    }
       
    };

    const editarEtiqueta = async (id: number, datos: Omit<EtiquetaFrontend, 'id'>) => {
        setEtiquetas(prev => prev.map(e => e.id === id ? { ...e, ...datos } : e));
        const respuesta = await updateEtiqueta(id, datos);
        if (!respuesta.success) {
        console.error('Fallo al actualizar en BD');
        }
    };

    const borrarEtiqueta = async (id: number) => {
        setEtiquetas(prev => prev.filter(e => e.id !== id));
        await deleteEtiqueta(id);
    };

  return {
    etiquetas,
    loading,
    agregarEtiqueta,
    editarEtiqueta,
    borrarEtiqueta
  };
}
   
