import { useUser } from "../zustand/useUser"
import { useState } from "react"
import { useNavigate } from "react-router"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const registerUser = useUser((state) => state.registerUser)
  const navigate = useNavigate()

  const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    registerUser(email, password, navigate)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    console.log(email)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <div className="w-full relative">
        <form 
          onSubmit={submitRegister}
          className="flex w-full p-3 flex-col gap-5">
          <h1 className="text-center text-2xl font-bold">Registrarse</h1>
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
            Registrar
          </button>
        </form>
      </div>
    </>
  )
}