

import React, { useState } from 'react'
import { TodoNameContext } from './TodoNameContext'

type TodoNameProviderProps = {
  children: React.ReactNode
}

export default function TodoNameProvider ({ children }: TodoNameProviderProps) {

  const [nombreTarea, setNombreTarea] = useState("")
  const [descripcionTarea, setDescripcionTarea] = useState("")
  const [id, setId] = useState("")
  const [actualizar, setActualizar] = useState(false)

  return (
    <TodoNameContext.Provider value={{nombreTarea, setNombreTarea, descripcionTarea, setDescripcionTarea, id, setId, actualizar, setActualizar}}>
      { children }
    </TodoNameContext.Provider>
  )
}
