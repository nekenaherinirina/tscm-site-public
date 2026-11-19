import './Header.css';

function Header({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'accueil', label: 'Home' },
    { id: 'actualites', label: 'News' },
    { id: 'journal', label: 'Journal' },
    { id: 'projets', label: 'Projects' },
    { id: 'offres', label: 'Offers' },
    { id: 'apropos', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="header">
      <div className="header-content">
        
        {/* LOGO */}
        <div className="header-logo" onClick={() => setCurrentPage('accueil')}>
          <img src="/logo.png" alt="TSCM Logo" className="logo-image" />
        </div>

        {/* MENU */}
        <nav className="header-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* BOUTONS */}
        <div className="header-actions">
          <button className="btn-membre">Member</button>
          <button className="btn-signin">Sign In</button>
        </div>

      </div>
    </header>
  );
}

export default Header;
