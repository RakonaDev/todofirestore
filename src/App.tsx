
import { Route, Routes } from 'react-router'
import './App.css'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import LoboLogo from './assets/lobo-logo.png'
import { useContext } from 'react'
import { FeaturesContext } from './context/FeaturesContext'
import ErrorPage from './pages/ErrorPage'
import AlertErrorCard from './components/AlertErrorCard'
import TodoNameProvider from './context/TodoNameProvider'
import { AnimatePresence, motion } from 'motion/react'
import CargandoCard from './components/CargandoCard'

function App() {
  const { error, cargando } = useContext(FeaturesContext)

  return (
    <>
      <AnimatePresence mode='popLayout'>
      {error.estado ?
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            
            layout
          >
            <AlertErrorCard />
          </motion.div>
        :
        <motion.div key="empty-error" />
      }
      {cargando.estado ?
        <motion.div
          key="cargando"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.45 }}
          layout
        >
          <CargandoCard />
        </motion.div>
        :
        <motion.div key="empty-cargando" />
      }

      </AnimatePresence>
      <img src={LoboLogo} alt="Logo" className="w-16 h-16 mb-10 absolute top-5 left-5" />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<TodoNameProvider><Home /></TodoNameProvider>} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
