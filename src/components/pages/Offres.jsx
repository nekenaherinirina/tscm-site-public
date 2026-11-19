import { useState, useEffect } from 'react';
import './Offres.css';

function Offres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/offres');
      const data = await response.json();
      setOffres(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const stages = offres.filter(o => o.type === 'stage');
  const emplois = offres.filter(o => o.type === 'emploi');
  const appels = offres.filter(o => o.type === 'appel');

  return (
    <div className="page-offres">
      <h1 className="offres-title">OFFRES</h1>

      {/* STAGES */}
      <section className="offres-section">
        <h2 className="offres-section-title">💼 STAGES</h2>
        {stages.length === 0 ? (
          <p className="empty-msg">Aucune offre de stage pour le moment</p>
        ) : (
          <div className="offres-grid">
            {stages.map(offre => (
              <OffreCard key={offre.id} offre={offre} />
            ))}
          </div>
        )}
      </section>

      {/* EMPLOIS */}
      <section className="offres-section">
        <h2 className="offres-section-title">👔 EMPLOIS</h2>
        {emplois.length === 0 ? (
          <p className="empty-msg">Aucune offre d'emploi pour le moment</p>
        ) : (
          <div className="offres-grid">
            {emplois.map(offre => (
              <OffreCard key={offre.id} offre={offre} />
            ))}
          </div>
        )}
      </section>

      {/* APPELS */}
      <section className="offres-section">
        <h2 className="offres-section-title">📢 APPELS À CANDIDATURE</h2>
        {appels.length === 0 ? (
          <p className="empty-msg">Aucun appel pour le moment</p>
        ) : (
          <div className="offres-grid">
            {appels.map(offre => (
              <OffreCard key={offre.id} offre={offre} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function OffreCard({ offre }) {
  return (
    <div className="offre-card">
      <h3>{offre.title}</h3>
      <p>{offre.description}</p>
      <div className="offre-meta">
        {offre.location && <span>📍 {offre.location}</span>}
        {offre.deadline && <span>📅 {offre.deadline}</span>}
      </div>
      {offre.link && (
        <a href={offre.link} target="_blank" rel="noopener noreferrer" className="offre-btn">
          Postuler →
        </a>
      )}
    </div>
  );
}

export default Offres;
