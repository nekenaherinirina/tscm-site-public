import { useState, useEffect } from 'react';
import './Journal.css';

function Journal() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [rapports, setRapports] = useState([]);

useEffect(() => {
  fetchAllArticles();
  fetchRapports();
}, []);

const fetchRapports = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/rapports');
    const data = await response.json();
    setRapports(data);
  } catch (error) {
    console.error('Erreur rapports:', error);
  }
};

  const fetchAllArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const tscmMonde = articles.filter(a => a.region === 'tscm_monde').slice(0, 4);
  const tscmMadagascar = articles.filter(a => a.region === 'tscm_madagascar').slice(0, 4);
  const madagascar = articles.filter(a => a.region === 'madagascar').slice(0, 4);

  // Page détail article
  if (selectedArticle) {
    return (
      <div className="journal-detail">
        <button className="back-btn" onClick={() => setSelectedArticle(null)}>
          ← Back to Journal
        </button>

        {selectedArticle.image && (
          <div
            className="detail-image"
            style={{ backgroundImage: `url(${selectedArticle.image})` }}
          />
        )}

        <div className="detail-content">
          <span className="category-tag">{selectedArticle.source}</span>
          <h1>{selectedArticle.title}</h1>
          <span className="article-date">
            {new Date(selectedArticle.pub_date).toLocaleDateString()}
          </span>
          <p className="detail-description">{selectedArticle.description}</p>
          
          <a
            href={selectedArticle.link}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            Read full article →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="page-journal">
      
      {/* SECTION TSCM MONDE */}
      {tscmMonde.length > 0 && (
        <section className="journal-section">
          <h2 className="journal-section-title">
            🌍 TSCM MONDE
            <span className="section-subtitle">ONG internationales</span>
          </h2>
          <div className="journal-grid">
            {tscmMonde.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION TSCM MADAGASCAR */}
      {tscmMadagascar.length > 0 && (
        <section className="journal-section">
          <h2 className="journal-section-title">
            🇲🇬 TSCM MADAGASCAR
            <span className="section-subtitle">Actions locales</span>
          </h2>
          <div className="journal-grid">
            {tscmMadagascar.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION MADAGASCAR */}
      {madagascar.length > 0 && (
        <section className="journal-section">
          <h2 className="journal-section-title">
            📍 MADAGASCAR
            <span className="section-subtitle">Actualités du pays</span>
          </h2>
          <div className="journal-grid">
            {madagascar.map(article => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        </section>
      )}

{/* SECTION RAPPORTS */}
<section className="journal-section">
  <h2 className="journal-section-title">
    📄 RAPPORTS & PUBLICATIONS
    <span className="section-subtitle">Documents officiels</span>
  </h2>
  
  {rapports.length === 0 ? (
    <div className="coming-soon">
      <p>Aucun rapport publié pour le moment</p>
      <span className="coming-soon-note">
        Les rapports officiels de TSCM apparaîtront ici
      </span>
    </div>
  ) : (
    <div className="rapports-list">
      {rapports.map(rapport => (
        <div key={rapport.id} className="rapport-item">
          <div className="rapport-icon">📄</div>
          <div className="rapport-info">
            <h3>{rapport.title}</h3>
            <p>{rapport.description}</p>
            <div className="rapport-meta">
              <span>{rapport.category}</span>
              <span>{rapport.year}</span>
            </div>
          </div>
          <a
            href={rapport.pdf_link}
            target="_blank"
            rel="noopener noreferrer"
            className="rapport-download"
          >
            Télécharger
          </a>
        </div>
      ))}
    </div>
  )}
</section>
      {loading && (
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
      )}
    </div>
  );
}

// Composant carte article réutilisable
function ArticleCard({ article, onClick }) {
  return (
    <div
      className={`journal-card ${!article.image ? 'no-image' : ''}`}
      onClick={onClick}
    >
      {article.image && (
        <div
          className="journal-card-image"
          style={{ backgroundImage: `url(${article.image})` }}
        />
      )}
      <div className="journal-card-content">
        <span className="category-tag">{article.source}</span>
        <h3>{article.title}</h3>
        <p>{article.description?.substring(0, 150)}...</p>
        <span className="article-date">
          {new Date(article.pub_date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default Journal;
