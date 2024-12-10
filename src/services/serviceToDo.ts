import { addDoc, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbTareas } from "../credentials";

const collectionTareas = collection(dbTareas, "tareas")

export function addTodo (nombreTarea: string, descripcionTarea: string, estado: boolean, uid: string | null) {
  return addDoc(collectionTareas, {
    nombreTarea,
    descripcionTarea,
    uid,
    estado
  })
}

export async function getTodo (uid: string | null) {
  const queryTareas = query(collectionTareas, where("uid", "==", uid));
  return await getDocs(queryTareas)
}

export async function deleteTodo (id: string) {
  return await deleteDoc(doc(dbTareas, "tareas", id))
}

export async function updateTodo (estado: boolean, id: string) {
  return await updateDoc(doc(dbTareas, "tareas", id), {
    estado: estado
  })
}

export async function updateNameTodo (nombreTarea: string,descripcionTarea: string, id: string) {
  return await updateDoc(doc(dbTareas, "tareas", id), {
    nombreTarea,
    descripcionTarea
  })
}