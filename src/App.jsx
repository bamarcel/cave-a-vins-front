import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import CavePage  from './pages/CavePage'

export default function App() {
  const [connecte, setConnecte] = useState(
    !!localStorage.getItem('token')  // true si un token existe déjà
  )

  const handleLogin  = () => setConnecte(true)
  const handleLogout = () => {
    localStorage.removeItem('token')
    setConnecte(false)
  }

  return connecte
    ? <CavePage  onLogout={handleLogout} />
    : <LoginPage onLogin={handleLogin}  />
}