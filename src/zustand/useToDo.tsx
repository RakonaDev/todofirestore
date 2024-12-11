import { ToDo } from "@/models/ToDo.model";
import { addTodo, deleteTodo, getTodo, updateNameTodo, updateTodo } from "../services/serviceToDo";
import { create } from "zustand";
import { Dispatch, SetStateAction } from "react";
import { ICargando } from "@/models/Cargando.model";
import { IError } from "@/models/Error.mode";


export interface ToDoState {
  tareas: Array<ToDo>
  realizando: boolean
}

export interface ToDoActions {
  añadirTarea: (nombreTarea: string, descripcionTarea: string, estado: boolean, uid: string | null, setError: React.Dispatch<React.SetStateAction<IError>>, setCargando: React.Dispatch<React.SetStateAction<ICargando>>) => void
  recibirTareas: (uid: string | null, setCargando: Dispatch<SetStateAction<ICargando>>, setError: Dispatch<SetStateAction<IError>>) => void
  eliminarTarea: (id: string, setCargando: Dispatch<SetStateAction<ICargando>>, setError: Dispatch<SetStateAction<IError>>) => void
  resolverTarea: (id: string, estado: boolean) => void
  actualizarTarea: (id: string, nombreTarea: string, descripcionTarea: string, setError: Dispatch<SetStateAction<IError>>) => void
}

export const useTodo = create<ToDoState & ToDoActions>()(
  (set) => {
    const debounceTimers: Record<string, NodeJS.Timeout> = {};
    return {
      tareas: [],
      realizando: false,
      añadirTarea: async (nombreTarea: string, descripcionTarea: string, estado: boolean, uid: string | null, setError: React.Dispatch<React.SetStateAction<IError>>, setCargando: React.Dispatch<React.SetStateAction<ICargando>> ) => {
        setCargando({
          estado: true,
          mensajeCargando: 'Añadiendo la tarea'
        })
        try {
          const docRef = await addTodo(nombreTarea, descripcionTarea, estado, uid)
          const tarea: ToDo = {
            id: docRef.id,
            nombreTarea,
            descripcionTarea,
            estado
          }

          set((state: ToDoState & ToDoActions) => (
            {
              ...state,
              tareas: [tarea, ...state.tareas]
            }
          ))
        }
        catch (error: Error | unknown ) {
          console.error(error)
          setError({
            estado: true,
            mensajeError: 'Error al añadir la tarea'
          })
        }
        finally {
          setCargando({
            estado: false,
            mensajeCargando: ''
          })
        }
      },
      recibirTareas: async (uid: string | null, setCargando: Dispatch<SetStateAction<ICargando>>, setError: Dispatch<SetStateAction<IError>>) => {
        setCargando({
          estado: true,
          mensajeCargando: 'Cargando tus tareas'
        })
        try {
          /*throw new Error("Error")*/
          const tareas: Array<ToDo> = []
          const querySnapshot = await getTodo(uid)
          querySnapshot.forEach((doc) => {
            const nuevaTarea = {
              id: doc.id,
              nombreTarea: doc.data().nombreTarea,
              descripcionTarea: doc.data().descripcionTarea,
              estado: doc.data().estado
            }
            tareas.unshift(nuevaTarea)
          })

          set({ tareas })
        }
        catch (error) {
          console.error(error)
          setError({
            estado: true,
            mensajeError: 'Error al recibir tus tareas'
          })
        }
        finally {
          setCargando({
            estado: false,
            mensajeCargando: ''
          })
        }
      },
      eliminarTarea: async (id: string, setCargando: Dispatch<SetStateAction<ICargando>>, setError: Dispatch<SetStateAction<IError>>) => {
        setCargando({
          estado: true,
          mensajeCargando: 'Eliminando tarea...'
        })
        try {
          set((state: ToDoState & ToDoActions) => ({
            ...state,
            tareas: state.tareas.filter((tarea) => tarea.id !== id),
          }))
          await deleteTodo(id)
        }
        catch (error) {
          console.error(error)
          setError({
            estado: true,
            mensajeError: 'Error al eliminar la tarea'
          })
        }
        finally {
          setCargando({
            estado: false,
            mensajeCargando: ''
          })
        }
      },
      resolverTarea: (id: string, estado: boolean) => {
        set((state) => ({
          ...state,
          tareas: state.tareas.map((tarea) =>
            tarea.id === id ? { ...tarea, estado } : tarea
          ),
        }));

        if (debounceTimers[id]) {
          clearTimeout(debounceTimers[id]);
        }

        debounceTimers[id] = setTimeout(async () => {
          try {
            await updateTodo(estado, id);
            delete debounceTimers[id]; // Limpia el temporizador una vez completado
          } catch (error) {
            console.error(error);
          }
        }, 7000);
      },
      actualizarTarea: async (id: string, nombreTarea: string, descripcionTarea: string, setError: Dispatch<SetStateAction<IError>>) => {
        set((state) => ({
          ...state,
          tareas: state.tareas.map((tarea) =>
            tarea.id === id ? { ...tarea, nombreTarea, descripcionTarea } : tarea
          ),
        }));

        try {
          await updateNameTodo(nombreTarea, descripcionTarea, id);
        }
        catch (error) {
          console.error(error)
          setError({
            estado: true,
            mensajeError: 'Error al actualizar la tarea'
          })
        }
      }
    }
  }
)