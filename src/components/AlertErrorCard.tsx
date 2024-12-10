import CloseIcon from "../icons/CloseIcon";
import { FeaturesContext } from "../context/FeaturesContext";
import ErrorIcon from "../icons/ErrorIcon";
import { useContext } from "react";

export default function AlertErrorCard() {
  const { mensajeError, setError } = useContext(FeaturesContext)


  return (
    <>
      <section className="flex z-10 gap-4 p-3 bg-red-500 rounded-lg absolute top-5 w-[95vw] lg:max-w-[600px] left-[50%] translate-x-[-50%]">
        <button 
          title="Cerrar" 
          type="button" 
          className="w-full flex justify-end absolute right-3 top-2"
          onClick={() => setError(false)}
        >
          <CloseIcon />
        </button>
        <div className="h-full my-auto">
          <ErrorIcon />
        </div>
        <div>
          <p className="text-white text-2xl lg:text-3xl font-bold">Error</p>
          <p className="text-white text-base lg:text-lg">{mensajeError}</p>
        </div>
      </section>
    </>
  )
}
