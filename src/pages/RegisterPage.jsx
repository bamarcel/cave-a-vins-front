import { useState } from 'react'
import { register } from '../api/bouteilles.api'

export default function RegisterPage({ onRegister, onGoLogin }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [erreur,   setErreur]   = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErreur('')

    // Validation avant appel API
    if (password.length < 8) {
      return setErreur('Le mot de passe doit faire au moins 8 caractères')
    }
    if (password !== confirm) {
      setPassword('')
      setConfirm('')
      return setErreur('Les mots de passe ne correspondent pas')
    }

    setLoading(true)
    try {
      const data = await register(email, password)
      localStorage.setItem('token', data.token)
      onRegister()
    } catch (err) {
      setPassword('')
      setConfirm('')
      setErreur(err.response?.data?.erreur || 'Erreur lors de la création du compte')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titre}>🍷 Ma Cave</h1>
        <p style={styles.sous}>Crée ton compte pour commencer</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe (8 caractères min)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={styles.input}
            required
          />

          {erreur && <p style={styles.erreur}>{erreur}</p>}

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>

        <p style={styles.lien}>
          Déjà un compte ?{' '}
          <span onClick={onGoLogin} style={styles.lienSpan}>
            Se connecter
          </span>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a0a0a'
  },
  card: {
    background: '#2d1515',
    padding: '2.5rem',
    borderRadius: '12px',
    width: '360px',
    border: '1px solid #5c2a2a'
  },
  titre:  { color: '#e8c4a0', margin: '0 0 6px', fontSize: '1.8rem', textAlign: 'center' },
  sous:   { color: '#9a7a6a', fontSize: '0.9rem', textAlign: 'center', marginBottom: '2rem' },
  form:   { display: 'flex', flexDirection: 'column', gap: '12px' },
  input: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #5c2a2a',
    background: '#1a0a0a',
    color: '#e8c4a0',
    fontSize: '0.95rem'
  },
  btn: {
    padding: '11px',
    borderRadius: '8px',
    border: 'none',
    background: '#8b1a1a',
    color: '#e8c4a0',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '6px'
  },
  erreur:   { color: '#e57373', fontSize: '0.85rem', margin: 0 },
  lien:     { color: '#9a7a6a', fontSize: '0.85rem', textAlign: 'center', marginTop: '1.5rem' },
  lienSpan: { color: '#e8c4a0', cursor: 'pointer', textDecoration: 'underline' }
}