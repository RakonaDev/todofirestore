import { useState } from "react";
import LoginForm from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

const FooterRegister = ( { setOpenRegister } : { setOpenRegister: React.Dispatch<React.SetStateAction<boolean>> } ) => {

  const switchOption = () => {
    setOpenRegister(true)
  }

  return (
    <div className="w-full flex mt-3 flex-col gap-2 items-center">
      <p className="text-center">Quieres Registrarte?</p>
      <button
        type="button"
        className="bg-green-600 mx-auto text-white px-10 py-2 rounded-lg "
        onClick={switchOption}
      >
        Registrarse
      </button>
    </div>
  )
}

const FooterLogin = ( { setOpenRegister } : { setOpenRegister: React.Dispatch<React.SetStateAction<boolean>> } ) => {
  const switchOption = () => {
    setOpenRegister(false)
  }

  return (
    <div className="w-full flex mt-3 flex-col gap-2 items-center">
      <p className="text-center">Ya tienes una cuenta?</p>
      <button
        type="button"
        className="bg-green-600 mx-auto text-white px-10 py-2 rounded-lg "
        onClick={switchOption}
      >
        Login
      </button>
    </div>
  )
}

export function Login() {
  const [openRegister, setOpenRegister] = useState(false)


  return (
    <>
      <div className="w-full min-h-screen grid place-content-center place-items-center relative">
        <div className="max-w-xl w-[100vw]">
          {openRegister ? <RegisterForm /> : <LoginForm />}
          {openRegister ?
            <FooterLogin setOpenRegister={setOpenRegister} />
            : 
            <FooterRegister setOpenRegister={setOpenRegister} />
          }
        </div>
      </div>
    </>
  )
}