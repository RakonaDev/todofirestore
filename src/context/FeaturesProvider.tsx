import { useState } from "react";
import { FeaturesContext } from "./FeaturesContext";
import { ICargando } from "@/models/Cargando.model";
import { IError } from "@/models/Error.mode";

type Children = {
  children: React.ReactNode
}

export function FeaturesProvider ({ children } : Children) {

  const [cargando, setCargando] = useState<ICargando>({
    estado: false,
    mensajeCargando: ''
  })
  const [error, setError] = useState<IError>({
    estado: false,
    mensajeError: ''
  })

  return (
    <FeaturesContext.Provider value={{ cargando, error, setCargando, setError }}>
      { children }
    </FeaturesContext.Provider>
  )
}