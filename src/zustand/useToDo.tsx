import { ToDo } from "@/models/ToDo.model";
import { addTodo, deleteTodo, getTodo, updateNameTodo, updateTodo } from "../services/serviceToDo";
import { create } from "zustand";
import { Dispatch, SetStateAction } from "react";


export interface ToDoState {
  tareas: Array<ToDo>
  realizando: boolean
}

export interface ToDoActions {
  añadirTarea: (nombreTarea: string, descripcionTarea: string, estado: boolean, uid: string | null) => void
  recibirTareas: (uid: string | null, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>) => void
  eliminarTarea: (id: string) => void
  resolverTarea: (id: string, estado: boolean) => void
  actualizarTarea: (id: string, nombreTarea: string, descripcionTarea: string, setError: Dispatch<SetStateAction<boolean>>) => void
}

export const useTodo = create<ToDoState & ToDoActions>()(
  (set) => {
    const debounceTimers: Record<string, NodeJS.Timeout> = {};
    return {
      tareas: [],
      realizando: false,
      añadirTarea: async (nombreTarea: string, descripcionTarea: string, estado: boolean, uid: string | null) => {
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
        catch (error) {
          console.error(error)
        }
      },
      recibirTareas: async (uid: string | null, setLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<boolean>>) => {
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
          setError(true)
        }
        finally {
          setLoading(false)
        }
      },
      eliminarTarea: async (id: string) => {
        try {
          await deleteTodo(id)
          set((state: ToDoState & ToDoActions) => ({
            ...state,
            tareas: state.tareas.filter((tarea) => tarea.id !== id)
          }))
        }
        catch (error) {
          console.error(error)
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
      actualizarTarea: async (id: string, nombreTarea: string, descripcionTarea: string, setError: Dispatch<SetStateAction<boolean>>) => {
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
          setError(true)
        }
      }
    }
  }
)