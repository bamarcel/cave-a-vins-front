import { useState, useEffect } from 'react'
import { getBouteilles } from '../api/bouteilles.api'
import BouteilleCard  from '../components/BouteilleCard'
import BouteilleForm  from '../components/BouteilleForm'
import Filtres        from '../components/Filtres'

export default function CavePage({ onLogout }) {
  const [bouteilles, setBouteilles] = useState([])
  const [bouteilleEnEdition, setBouteilleEnEdition] = useState(null)
  const [loading,    setLoading]    = useState(true)

  const charger = async (filtres = {}) => {
    setLoading(true)
    try {
      const data = await getBouteilles(filtres)
      setBouteilles(data)
    } 
    catch (err) {
      console.error(err)
    } 
    finally {
      setLoading(false)
    }
  }

  const handleAjout = () => {
    setBouteilleEnEdition(null)
    charger()
  }

  // Chargement initial
  useEffect(() => { charger() }, [])

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.titre}>🍷 Ma Cave</h1>
        <button onClick={onLogout} style={styles.logout}>Déconnexion</button>
      </header>

      <div style={styles.contenu}>

        {/* Colonne gauche — formulaire */}
        <aside style={styles.aside}>
          <BouteilleForm 
            bouteille={bouteilleEnEdition}
            onAjout={handleAjout} />
        </aside>

        {/* Colonne droite — liste */}
        <main style={styles.main}>
          <Filtres onFiltrer={charger} />

          {loading && <p style={styles.msg}>Chargement...</p>}

          {!loading && bouteilles.length === 0 && (
            <p style={styles.msg}>Aucune bouteille dans ta cave.</p>
          )}

          <div style={styles.grille}>
            {bouteilles.map(b => (
              <BouteilleCard 
                key={b.id} 
                bouteille={b}
                onModifier={() => setBouteilleEnEdition(b)}  
              />
            ))}
          </div>
        </main>

      </div>
    </div>
  )
}

const styles = {
  page:    { minHeight: '100vh', background: '#1a0a0a', color: '#e8c4a0' },
  header:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #5c2a2a' },
  titre:   { margin: 0, fontSize: '1.5rem' },
  logout:  { background: 'transparent', border: '1px solid #5c2a2a', color: '#9a7a6a', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer' },
  contenu: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', padding: '2rem', maxWidth: '1200px', margin: '0 auto' },
  aside:   { position: 'sticky', top: '2rem', alignSelf: 'start' },
  main:    {},
  grille:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' },
  msg:     { color: '#9a7a6a', textAlign: 'center', padding: '3rem 0' }
}