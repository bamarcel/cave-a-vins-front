import { useState } from 'react'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CavePage     from './pages/CavePage'

export default function App() {
  const [page, setPage] = useState(
    localStorage.getItem('token') ? 'cave' : 'login'
  )

  const handleLogin    = () => setPage('cave')
  const handleRegister = () => setPage('cave')
  const handleLogout   = () => {
    localStorage.removeItem('token')
    setPage('login')
  }

  if (page === 'cave')     return <CavePage     onLogout={handleLogout} />
  if (page === 'register') return <RegisterPage onRegister={handleRegister} onGoLogin={() => setPage('login')} />
  return                          <LoginPage    onLogin={handleLogin}    onGoRegister={() => setPage('register')} />
}