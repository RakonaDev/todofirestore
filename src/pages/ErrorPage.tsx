import { Link } from "react-router-dom"
import Distorcion from "../assets/404.gif"

export default function ErrorPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="font-bold text-2xl lg:text-4xl">404 - Página no encontrada</h1>
      <img src={Distorcion} alt="Distorcion" className="w-full lg:max-w-[50rem] rounded-lg"/>
      <Link to="/" className="bg-blue-600 text-white px-10 py-2 rounded-lg duration-500 transition-all hover:bg-blue-800">Volver a Inicio</Link>
    </div>
  )
}
