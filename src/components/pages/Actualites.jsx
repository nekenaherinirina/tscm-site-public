import { useState, useEffect } from 'react';
import './Actualites.css';

function Actualites() {
  const [filter, setFilter] = useState('all');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const url = filter === 'all'
        ? 'http://localhost:4000/api/articles'
        : `http://localhost:4000/api/articles?region=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prendre le premier article qui a une image comme article principal
  const mainArticle = articles.find(a => a.image) || articles[0];
  const sideArticles = articles.filter(a => a.id !== mainArticle?.id).slice(0, 3);
  const moreArticles = articles.filter(a => a.id !== mainArticle?.id).slice(3, 9);

  // Si un article est sélectionné, afficher la page détail
  if (selectedArticle) {
    return (
      <div className="article-detail">
        <button className="back-btn" onClick={() => setSelectedArticle(null)}>
          ← Back to News
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
    <div className="page-actualites">
      
      {/* FILTRES */}
<div className="actualites-filters">
  <button
    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
    onClick={() => setFilter('all')}
  >
    🌍 All
  </button>
  <button
    className={`filter-btn ${filter === 'madagascar' ? 'active' : ''}`}
    onClick={() => setFilter('madagascar')}
  >
    🇲🇬 Madagascar
  </button>
  <button
    className={`filter-btn ${filter === 'international' ? 'active' : ''}`}
    onClick={() => setFilter('international')}
  >
    🌍 International
  </button>
</div>
      {loading ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
      ) : articles.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>No articles found.</p>
      ) : (
        <>
          {/* ARTICLE PRINCIPAL */}
          {mainArticle && (
            <div
              className={`actualites-featured ${!mainArticle.image ? 'no-image' : ''}`}
              onClick={() => setSelectedArticle(mainArticle)}
            >
              {mainArticle.image && (
                <div
                  className="featured-image"
                  style={{ backgroundImage: `url(${mainArticle.image})` }}
                >
                  <span className="region-badge">
                    {mainArticle.region === 'madagascar' ? '🇲🇬 Madagascar' : '🌍 International'}
                  </span>
                </div>
              )}
              <div className="featured-content">
                <span className="category-tag">{mainArticle.source}</span>
                <h2>{mainArticle.title}</h2>
                <p>{mainArticle.description?.substring(0, 400)}...</p>
                <span className="article-date">
                  {new Date(mainArticle.pub_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}

          {/* ARTICLES SECONDAIRES */}
          <div className="actualites-grid">
            {sideArticles.map(article => (
              <div
                key={article.id}
                className={`article-card ${!article.image ? 'no-image' : ''}`}
                onClick={() => setSelectedArticle(article)}
              >
                {article.image && (
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${article.image})` }}
                  >
                    <span className="region-badge-small">
                      {article.region === 'madagascar' ? '🇲🇬' : '🌍'}
                    </span>
                  </div>
                )}
                <div className="card-content">
                  <span className="category-tag">{article.source}</span>
                  <h3>{article.title}</h3>
                  <p>{article.description?.substring(0, 100)}...</p>
                  <span className="article-date">
                    {new Date(article.pub_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* PLUS D'ARTICLES */}
          {moreArticles.length > 0 && (
            <div className="actualites-grid" style={{ marginTop: '25px' }}>
              {moreArticles.map(article => (
                <div
                  key={article.id}
                  className={`article-card ${!article.image ? 'no-image' : ''}`}
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.image && (
                    <div
                      className="card-image"
                      style={{ backgroundImage: `url(${article.image})` }}
                    >
                      <span className="region-badge-small">
                        {article.region === 'madagascar' ? '🇲🇬' : '🌍'}
                      </span>
                    </div>
                  )}
                  <div className="card-content">
                    <span className="category-tag">{article.source}</span>
                    <h3>{article.title}</h3>
                    <p>{article.description?.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Actualites;
