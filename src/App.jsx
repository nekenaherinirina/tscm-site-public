import ChatBot from './components/ChatBot';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Accueil from './components/pages/Accueil';
import Actualites from './components/pages/Actualites';
import Journal from './components/pages/Journal';
import Projets from './components/pages/Projets';
import Offres from './components/pages/Offres';
import APropos from './components/pages/APropos';
import Contact from './components/pages/Contact';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('accueil');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <Accueil />;
      case 'actualites': return <Actualites />;
      case 'journal': return <Journal />;
      case 'projets': return <Projets />;
      case 'offres': return <Offres />;
      case 'apropos': return <APropos />;
      case 'contact': return <Contact />;
      default: return <Accueil />;
    }
  };

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <SearchBar />
      <main className="app-main">
        {renderPage()}
      </main>
      <ChatBot />
    </div>
  );
}

export default App;
