import { ToDo } from "@/models/ToDo.model";
import { useTodo } from "../zustand/useToDo";
import './ToDoItem.css'
import { useContext } from "react";
import { TodoNameContext } from "../context/TodoNameContext";


export function ToDoItem({ id, nombreTarea, descripcionTarea, estado }: ToDo) {
  const eliminarTarea = useTodo((state) => state.eliminarTarea)
  const resolverTarea = useTodo((state) => state.resolverTarea)

  const { setActualizar, setNombreTarea, setDescripcionTarea, setId } = useContext(TodoNameContext)	
  
  const actualizarTarea = () => {
    setActualizar(true)
    setNombreTarea(nombreTarea)
    setDescripcionTarea(descripcionTarea)
    setId(id)
  }

  return (
    <div className="w-full bg-gray-300 p-2 rounded-md mt-5">
      <div className="w-full border-b-2 border-black flex gap-4 items-center">
        <input 
          type="checkbox" 
          name="tarea" 
          checked={estado}
          className="w-5 h-5 border-2 border-black rounded-md" 
          onChange={() => resolverTarea(id, !estado)}
          title="Tarea hecha" 
        />
        <h1 className={`${ estado ? "hecho text-slate-800": "" } text-xl font-bold py-4`}>{nombreTarea}</h1>
      </div>
      <div className="w-full border-b-2 border-black">
        <p className={`${ estado ? "hecho text-slate-800": "" } text-lg py-5`}>{descripcionTarea}</p>
      </div>
      <footer className="w-full flex justify-evenly py-5">
        { estado ? 
        <></>
        : 
        <button
          type="button"
          className="flex gap-3 items-center px-6 py-2 rounded-md bg-green-600 text-white text-lg transition-colors duration-500 hover:bg-green-800"
          onClick={actualizarTarea}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2"> <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path> <path d="M13.5 6.5l4 4"></path> </svg>
          Editar
        </button> }
        <button
          type="button"
          className="flex gap-3 items-center px-6 py-2 rounded-md bg-red-600 text-white text-lg transition-colors duration-500 hover:bg-red-800"
          onClick={() => eliminarTarea(id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
          Eliminar
        </button>
      </footer>
    </div>
  )
}
