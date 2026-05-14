import { useState, useEffect } from 'react'
import { createBouteille, updateBouteille, uploadPhoto } from '../api/bouteilles.api'

export default function BouteilleForm({ bouteille = null, onAjout }) {
  const [form, setForm] = useState({
    nom:        bouteille?.nom          || '', 
    cepage:     bouteille?.cepage       || '', 
    region:     bouteille?.region       || '', 
    millesime:  bouteille?.millesime    || '', 
    note:       bouteille?.note         || ''
  })
  const [photo,   setPhoto]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [erreur,  setErreur]  = useState('')

  useEffect(() => {
    if (bouteille) {
      // bouteille sélectionnée → pré-remplir
      setForm({
        nom:       bouteille.nom       || '',
        cepage:    bouteille.cepage    || '',
        region:    bouteille.region    || '',
        millesime: bouteille.millesime || '',
        note:      bouteille.note      || ''
      })
    } else {
      // retour en mode création → vider
      setForm({ nom: '', cepage: '', region: '', millesime: '', note: '' })
    }
  }, [bouteille])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom) return setErreur('Le nom est obligatoire')

    setLoading(true)
    setErreur('')

    try {
      let bouteilleResult

      // 1. Créer la bouteille ou la mettre à jour
      if(bouteille){
        bouteilleResult = await updateBouteille(bouteille.id, form)
      }
      else{
        bouteilleResult = await createBouteille(form)
      }

      // 2. Si une photo est sélectionnée, l'uploader
      if (photo) {
        await uploadPhoto(bouteilleResult.id, photo)
      }

      // 3. Notifier le parent pour rafraîchir la liste
      onAjout()

      // 4. Réinitialiser le formulaire
      setForm({ nom: '', cepage: '', region: '', millesime: '', note: '' })
      setPhoto(null)

    } catch (err) {
      setErreur(err.response?.data?.erreur || 'Erreur lors de l\'ajout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.titre}>{bouteille ? 'Modifier' : 'Ajouter'} une bouteille</h2>

      <input name="nom"       placeholder="Nom *"      value={form.nom}       onChange={handleChange} style={styles.input} required />
      <input name="cepage"    placeholder="Cépage"     value={form.cepage}    onChange={handleChange} style={styles.input} />
      <input name="region"    placeholder="Région"     value={form.region}    onChange={handleChange} style={styles.input} />
      <input name="millesime" placeholder="Millésime"  value={form.millesime} onChange={handleChange} style={styles.input} type="number" />
      <input name="note"      placeholder="Note /20"   value={form.note}      onChange={handleChange} style={styles.input} type="number" min="0" max="20" step="0.5" />

      <label style={styles.photoLabel}>
        {photo ? `📷 ${photo.name}` : '+ Ajouter une photo'}
        <input type="file" accept="image/*" onChange={e => setPhoto(e.target.files[0])} style={{ display: 'none' }} />
      </label>

      {erreur && <p style={styles.erreur}>{erreur}</p>}

      <button type="submit" disabled={loading} style={styles.btn}>
        {loading ? bouteille ? 'Modification en cours...' : 'Ajout en cours...' : bouteille ? 'Mettre à jour' : 'Ajouter à la cave'}
      </button>
    </form>
  )
}

const styles = {
  form:       { background: '#2d1515', border: '1px solid #5c2a2a', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' },
  titre:      { color: '#e8c4a0', margin: '0 0 8px', fontSize: '1.1rem' },
  input: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px solid #5c2a2a',
    background: '#1a0a0a',
    color: '#e8c4a0',
    fontSize: '0.9rem'
  },
  photoLabel: {
    padding: '9px 12px',
    borderRadius: '8px',
    border: '1px dashed #5c2a2a',
    color: '#9a7a6a',
    fontSize: '0.9rem',
    cursor: 'pointer',
    textAlign: 'center'
  },
  btn:    { padding: '10px', borderRadius: '8px', border: 'none', background: '#8b1a1a', color: '#e8c4a0', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' },
  erreur: { color: '#e57373', fontSize: '0.85rem', margin: 0 }
}