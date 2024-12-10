import { useState } from "react";
import { FeaturesContext } from "./FeaturesContext";

type Children = {
  children: React.ReactNode
}

export function FeaturesProvider ({ children } : Children) {

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [mensajeCargando, setMensajeCargando] = useState('')

  return (
    <FeaturesContext.Provider value={{ cargando, error, mensajeError, mensajeCargando, setCargando, setError, setMensajeError, setMensajeCargando }}>
      { children }
    </FeaturesContext.Provider>
  )
}