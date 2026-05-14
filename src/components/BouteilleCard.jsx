export default function BouteilleCard({ bouteille, onModifier }) {
  const { nom, cepage, region, millesime, note, photo_url } = bouteille

  return (
    <div style={styles.card}>
      <div style={styles.photo}>
        {photo_url
          ? <img src={photo_url} alt={nom} style={styles.img} />
          : <div style={styles.placeholder}>🍾</div>
        }
      </div>
      <div style={styles.infos}>
        <h3 style={styles.nom}>{nom}</h3>
        <div style={styles.tags}>
          {cepage   && <span style={styles.tag}>{cepage}</span>}
          {region   && <span style={styles.tag}>{region}</span>}
          {millesime && <span style={styles.tag}>{millesime}</span>}
        </div>
        {note && <div style={styles.note}>{'★'.repeat(Math.round(note / 4))} {note}/20</div>}
      </div>
      <button onClick={onModifier} style={styles.btnModifier}>
        Modifier
      </button>
    </div>
  )
}

const styles = {
  card: {
    background: '#2d1515',
    border: '1px solid #5c2a2a',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    cursor: 'default'
  },
  photo:       { height: '160px', background: '#1a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  img:         { width: '100%', height: '100%', objectFit: 'cover' },
  placeholder: { fontSize: '3rem' },
  infos:       { padding: '14px' },
  nom:         { color: '#e8c4a0', margin: '0 0 8px', fontSize: '1rem' },
  tags:        { display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' },
  tag: {
    background: '#1a0a0a',
    color: '#9a7a6a',
    padding: '2px 8px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    border: '1px solid #5c2a2a'
  },
  note: { color: '#c8a060', fontSize: '0.85rem' },
  btnModifier: {
    margin: '8px 14px 14px',
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid #5c2a2a',
    background: 'transparent',
    color: '#9a7a6a',
    cursor: 'pointer',
    fontSize: '0.8rem'
  }
}