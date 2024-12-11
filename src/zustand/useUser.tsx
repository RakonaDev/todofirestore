
import { authFireBase } from "../credentials";
import { createUserWithEmailAndPassword, AuthError, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware"
import { NavigateFunction } from "react-router";
import React from "react";
import { ICargando } from "@/models/Cargando.model";
import { IError } from "@/models/Error.mode";

export interface User {
  displayName: string | null,
  email: string | null,
  phoneNumber: string | null,
  photoURL: string | null,
  providerId: string | null,
  uid: string | null,
  getIdToken: () => Promise<string | null>
}

export interface Token {
  token: string
}

export interface UserState {
  user: User
}

export interface UserActions {
  registerUser: (email: string, password: string, navigate: NavigateFunction) => void
  loginUser: (email: string, password: string, navigate: NavigateFunction, setError: React.Dispatch<React.SetStateAction<IError>>, setCargando: React.Dispatch<React.SetStateAction<ICargando>>) => void
  authUser: (navigate: NavigateFunction) => void
}

export const useUser = create<UserState & Token & UserActions>()(
  persist(
    (set) => ({
      token: "",

      user: {
        displayName: "",
        email: "",
        phoneNumber: "",
        photoURL: "",
        providerId: "",
        uid: "",
        getIdToken: () => Promise.resolve("")
      },

      registerUser: (email: string, password: string, navigate: NavigateFunction) => {
        createUserWithEmailAndPassword(authFireBase, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            user.getIdToken().then((token) => {
              set({ token })
            })
            set({ user })
            navigate('/home')
          })
          .catch((error: AuthError) => {
            console.log(error.message)
          })
      },
      loginUser: (email: string, password: string, navigate: NavigateFunction, setError: React.Dispatch<React.SetStateAction<IError>>, setCargando: React.Dispatch<React.SetStateAction<ICargando>>) => {
        setCargando({
          estado: true,
          mensajeCargando: 'Iniciando sesión...'
        })
        signInWithEmailAndPassword(authFireBase, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            user.getIdToken(false).then((token) => {
              set({ token })
            })
            set({ user })
            navigate('/home')
          })
          .catch((error: AuthError) => {
            setError({
              estado: true,
              mensajeError: 'Credenciales incorrectas. Intentelo denuevo!'
            })
            console.error(error.message)

            // Desaparezca el mensaje de error despues de 5 segundos
            setTimeout(() => {
              setError({
                estado: false,
                mensajeError: ''
              })
            }, 5000)
          })
          .finally(() => {
            setCargando({
              estado: false,
              mensajeCargando: ''
            })
          })
      },

      authUser: (navigate: NavigateFunction) => {
        onAuthStateChanged(authFireBase, (user) => {
          if (user) {
            set({ user })
          }
          else {
            navigate('/login')
          }
        })
      }

    }),
    {
      name: "user",
    }
  )
)