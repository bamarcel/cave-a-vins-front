import { useState } from 'react'

export default function Filtres({ onFiltrer }) {
  const [cepage,   setCepage]   = useState('')
  const [region,   setRegion]   = useState('')
  const [note_min, setNoteMin]  = useState('')

  const appliquer = () => {
    // On n'envoie que les filtres non vides
    const filtres = {}
    if (cepage)   filtres.cepage   = cepage
    if (region)   filtres.region   = region
    if (note_min) filtres.note_min = note_min
    onFiltrer(filtres)
  }

  const reinitialiser = () => {
    setCepage('')
    setRegion('')
    setNoteMin('')
    onFiltrer({})
  }

  return (
    <div style={styles.barre}>
      <input
        placeholder="Cépage..."
        value={cepage}
        onChange={e => setCepage(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Région..."
        value={region}
        onChange={e => setRegion(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Note min"
        min="0" max="20"
        value={note_min}
        onChange={e => setNoteMin(e.target.value)}
        style={{ ...styles.input, width: '100px' }}
      />
      <button onClick={appliquer}     style={styles.btnFiltrer}>Filtrer</button>
      <button onClick={reinitialiser} style={styles.btnReset}>Tout afficher</button>
    </div>
  )
}

const styles = {
  barre:      { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' },
  input: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #5c2a2a',
    background: '#2d1515',
    color: '#e8c4a0',
    fontSize: '0.9rem'
  },
  btnFiltrer: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#8b1a1a', color: '#e8c4a0', cursor: 'pointer', fontWeight: '500' },
  btnReset:   { padding: '8px 16px', borderRadius: '8px', border: '1px solid #5c2a2a', background: 'transparent', color: '#9a7a6a', cursor: 'pointer' }
}