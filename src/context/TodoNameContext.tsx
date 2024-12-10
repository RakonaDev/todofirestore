import React, { createContext } from "react";

type TodoNameContextType = {
  nombreTarea: string
  setNombreTarea: React.Dispatch<React.SetStateAction<string>>
  descripcionTarea: string
  setDescripcionTarea: React.Dispatch<React.SetStateAction<string>>
  id: string,
  setId: React.Dispatch<React.SetStateAction<string>>
  actualizar: boolean
  setActualizar: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoNameContext = createContext<TodoNameContextType>({} as TodoNameContextType)