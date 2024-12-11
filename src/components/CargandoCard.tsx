import { FeaturesContext } from "../context/FeaturesContext"
import { useContext } from "react"
import './CargandoCard.css'

export default function CargandoCard() {
  const { cargando } = useContext(FeaturesContext)


  return (
    <>
      <section className="flex z-10 gap-4 p-3 bg-green-600 rounded-lg fixed top-5 w-[95vw] lg:max-w-[600px] left-[50%] translate-x-[-50%]">
        <div className="h-full my-auto">
          <div className="rueda"></div>
        </div>
        <div>
          <p className="text-white text-2xl lg:text-3xl font-bold">Cargando...</p>
          <p className="text-white text-base lg:text-lg">{cargando.mensajeCargando}</p>
        </div>
      </section>
    </>
  )
}
