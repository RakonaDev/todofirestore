import { TodoNameContext } from "../context/TodoNameContext"
import { ToDoItem } from "../components/ToDoItem"
import { useTodo } from "../zustand/useToDo"
import { useUser } from "../zustand/useUser"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { AnimatePresence, motion } from "motion/react"

export function Home() {

  const { nombreTarea, setNombreTarea, descripcionTarea, setDescripcionTarea, id, actualizar, setActualizar } = useContext(TodoNameContext)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [estado] = useState(false)

  const authUser = useUser((state) => state.authUser)
  const uid = useUser((state) => state.user.uid)
  const añadirTarea = useTodo((state) => state.añadirTarea)
  const recibirTareas = useTodo((state) => state.recibirTareas)
  const actualizarTarea = useTodo((state) => state.actualizarTarea)

  const navigate = useNavigate()

  const handleTarea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreTarea(e.target.value)
  }
  const handleDescripcion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcionTarea(e.target.value)
  }

  const submitTarea = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    añadirTarea(nombreTarea, descripcionTarea, estado, uid)
    setNombreTarea("")
    setDescripcionTarea("")
  }

  const submitUpdateTarea = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    actualizarTarea(id, nombreTarea, descripcionTarea, setError)
    setNombreTarea("")
    setDescripcionTarea("")
    setActualizar(false)
  }

  useEffect(() => {
    authUser(navigate)
    recibirTareas(uid, setLoading, setError)
    console.log(tareas)
  }, [])
  const tareas = useTodo((state) => state.tareas)

  return (
    <>
      <h1 className='text-center mt-24 text-4xl font-bold'>Añadir una tarea</h1>

      <main className="mt-8 w-full flex justify-center pb-10 h-fit">
        <div className="max-w-[50rem] w-full">
          <form
            onSubmit={actualizar ? submitUpdateTarea : submitTarea}
            className="w-full flex flex-col gap-2 justify-center"
          >
            <div className="mb-4">
              <label htmlFor="nombreTarea">Nombre de la tarea: </label>
              <input
                type="text"
                name="tarea"
                id="nombreTarea"
                placeholder="Nombre de la tarea"
                value={nombreTarea}
                onChange={handleTarea}
                className="text-black w-full p-3 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="descripcionTarea">Descripción de la tarea: </label>
              <textarea
                name="desc"
                id="descripcionTarea"
                placeholder="Descripción de la tarea"
                onChange={handleDescripcion}
                value={descripcionTarea}
                className="resize-none text-black w-full p-3 rounded-lg"
                cols={30}
                rows={5}
                required
              >
              </textarea>
            </div>
            <input
              type="submit"
              value={actualizar ? "Actualizar Tarea" : "Crear Tarea"}
              className="mx-auto w-fit bg-blue-600 px-4 py-2 rounded-lg transition-colors duration-500 hover:bg-blue-400 cursor-pointer"
            />
          </form>
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout 
              className="mt-8 w-full bg-white text-black p-5 rounded-lg min-h-40"
              transition={{ duration: 0.4 }}
            >
              <motion.h1 
                className="text-center text-4xl font-bold pb-5"
                transition={{ duration: 1 }}
                key={"h1"}
              >
                Tareas
              </motion.h1>
              {loading ? <><h1 className="text-center text-2xl">Cargando tus tareas</h1></> : <></>}
              {error ? <><h1 className="text-center text-2xl">Error</h1></> : <></>}

              {!loading && !error && tareas.length != 0 ?
                tareas.map((tarea) => (
                  <motion.li 
                    key={tarea.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    layout
                  >
                    <ToDoItem
                      key={tarea.id}
                      id={tarea.id}
                      nombreTarea={tarea.nombreTarea}
                      descripcionTarea={tarea.descripcionTarea}
                      estado={tarea.estado}
                    />
                  </motion.li>
                ))
                :
                <></>
              }

              {!loading && tareas.length == 0 && !error ? <><h1 className="text-center text-xl">No hay tareas</h1></> : <></>}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  )
}