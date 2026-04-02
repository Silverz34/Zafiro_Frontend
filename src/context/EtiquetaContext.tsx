// Crear src/context/EtiquetasContext.tsx
'use client'
import { createContext, useContext } from 'react';
import { useEtiquetas } from '../../hooks/user/useEtiquetas';
import type { EtiquetaFrontend } from '../../lib/CrudEtiquetas/getEtiqueta';

export const EtiquetasCtx = createContext<ReturnType<typeof useEtiquetas> | null | undefined>(undefined);

export function EtiquetasProvider({ children }: { children: React.ReactNode }) {
  const value = useEtiquetas();
  return (
    <EtiquetasCtx.Provider value={value}>
      {children}
    </EtiquetasCtx.Provider>
  );
}

export function useEtiquetasCtx() {
  const ctx = useContext(EtiquetasCtx);
  if (!ctx) throw new Error('useEtiquetasCtx debe usarse dentro de EtiquetasProvider');
  return ctx;
}