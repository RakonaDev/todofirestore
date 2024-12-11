import { FeaturesContext } from "../context/FeaturesContext"
import { useUser } from "../zustand/useUser"
import { useContext, useState } from "react"
import { useNavigate } from "react-router"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginUser = useUser((state) => state.loginUser)
  const navigate = useNavigate()
  const { setError, setCargando } = useContext(FeaturesContext)
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    loginUser(email, password, navigate, setError, setCargando)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <div className="w-full relative">
        <form 
          onSubmit={handleSubmit}
          className="flex w-full p-3 flex-col gap-5">
          <h1 className="text-center text-2xl font-bold">Inicia Sesión</h1>
          <input
            type='email'
            placeholder='Email'
            onChange={handleEmail}
            value={email}
            className="text-black text-base w-full px-10 py-2 rounded-lg focus-within:outline-none border-none"
            required
          />
          <input
            type='password'
            placeholder='Password'
            onChange={handlePassword}
            value={password}
            className="text-black w-full px-10 py-2 rounded-lg focus:outline-none border-none"
            required
          />

          <button 
            type="submit"
            className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:scale-110 transition-all duration-700 mx-auto"
          >
            Inicia Sesión
          </button>
        </form>
      </div>
    </>
  )
}
