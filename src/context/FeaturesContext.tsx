import React, { createContext } from "react";

type FeaturesContextType = {
  cargando: boolean
  error: boolean
  mensajeError: string
  mensajeCargando: string
  setMensajeCargando: React.Dispatch<React.SetStateAction<string>>
  setMensajeError: React.Dispatch<React.SetStateAction<string>>
  setCargando: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<boolean>>
}

export const FeaturesContext = createContext<FeaturesContextType>({} as FeaturesContextType)