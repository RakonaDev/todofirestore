import { ICargando } from "@/models/Cargando.model";
import { IError } from "@/models/Error.mode";
import React, { createContext } from "react";


type FeaturesContextType = {
  cargando: ICargando
  error: IError
  setCargando: React.Dispatch<React.SetStateAction<ICargando>>
  setError: React.Dispatch<React.SetStateAction<IError>>
}

export const FeaturesContext = createContext<FeaturesContextType>({} as FeaturesContextType)