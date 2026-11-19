import './APropos.css';

function APropos() {
  const values = [
    { icon: '📚', title: 'Education', desc: 'Providing quality education and learning opportunities for children and adults worldwide.' },
    { icon: '🏥', title: 'Healthcare', desc: 'Essential healthcare services with focus on maternal and child health.' },
    { icon: '⚖️', title: 'Human Rights', desc: 'Advocating for the rights of all people, especially vulnerable populations.' },
    { icon: '🏘️', title: 'Community Development', desc: 'Building stronger communities through infrastructure and economic development.' },
  ];

  const branches = [
    { flag: '🇲🇬', city: 'Antsirabe', role: 'Headquarters', email: 'ad.antsirabe.md@thesunrisecenters.com', featured: true },
    { flag: '🇲🇬', city: 'Antananarivo', role: 'Regional Branch', email: 'ad.tana.md@thesunrisecenters.com' },
    { flag: '🇲🇬', city: 'Ihosy', role: 'Regional Branch', email: 'ad.ihosy.md@thesunrisecenters.com' },
    { flag: '🇲🇬', city: 'Toliara', role: 'Regional Branch', email: 'ad.toliara.md@thesunrisecenters.com' },
    { flag: '🇰🇪', city: 'Nairobi', role: 'Kenya Branch', email: 'ad.nairobi.ke@thesunrisecenters.com' },
    { flag: '🇲🇿', city: 'Maputo', role: 'Mozambique Branch', email: 'ad.maputo.mz@thesunrisecenters.com' },
    { flag: '🇺🇸', city: 'New Orleans', role: 'USA Branch', email: 'ad.neworleans.us@thesunrisecenters.com' },
  ];

  const timeline = [
    { year: '2017', text: 'Realized the lack of support for people with disabilities in Madagascar. Started recruiting 22 people with various intellectual and physical disabilities.' },
    { year: '2023', text: 'Opened the first Sunrise Center in Mahatsinjo, near Hell-Ville, Nosy Be. Started providing essential educational support to the disabled community.' },
    { year: '2024', text: 'Expanded to Antsirabe (headquarters), Antananarivo, Ihosy, and Toliara. Opened new center in Menapingo, Nosy Be.' },
    { year: '2026', text: 'International presence established: Kenya (Nairobi), Mozambique (Maputo), and USA (New Orleans).' },
  ];

  const partners = [
    'Madagascar Research & Conservation Institute',
    'Gulf for Good',
    'L.A.B Charity',
    "Jacob's Well Appeal",
    'Local Community Organizations',
    'Government Agencies',
    'Educational Institutions',
  ];

  return (
    <div className="page-apropos">

      {/* HERO */}
      <section className="apropos-hero">
        <h1>The Sunrise Centers International</h1>
        <p className="apropos-slogan">"A Brighter Tomorrow Awaits"</p>
        <p className="apropos-hero-text">
          Dedicated to the growth, development, and prosperity of communities worldwide 
          through education, healthcare, and human rights advocacy.
        </p>
      </section>

      {/* MISSION */}
      <section className="apropos-section">
        <h2 className="apropos-section-title">Our Mission</h2>
        <div className="apropos-mission">
          <p>
            The Sunrise Centers International is dedicated to the growth, development, 
            and prosperity of communities worldwide through education, healthcare, 
            and human rights advocacy.
          </p>
          <p>
            Together, we're making a difference in communities around the world. 
            We focus on four key areas to create lasting positive change: Education, 
            Healthcare, Human Rights, and Community Development.
          </p>
          <p>
            Your support helps us expand our reach and deepen our impact in communities worldwide.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="apropos-section">
        <h2 className="apropos-section-title">Our Story</h2>
        <div className="apropos-histoire">
          {timeline.map((item, i) => (
            <div key={i} className="histoire-item">
              <span className="histoire-annee">{item.year}</span>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="apropos-section">
        <h2 className="apropos-section-title">Our Values</h2>
        <div className="apropos-valeurs">
          {values.map((v, i) => (
            <div key={i} className="valeur-card">
              <span className="valeur-icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="apropos-section">
        <h2 className="apropos-section-title">Our Global Presence</h2>
        <p className="apropos-section-desc">
          Working with communities across continents to create lasting positive change. 
          Our regional branches coordinate programs and partnerships across their respective areas.
        </p>
        <div className="apropos-branches">
          {branches.map((b, i) => (
            <div key={i} className={`branche-card ${b.featured ? 'featured' : ''}`}>
              <span className="branche-flag">{b.flag}</span>
              <h3>{b.city}</h3>
              <p className="branche-role">{b.role}</p>
              <p className="branche-email">{b.email}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL PARTNERSHIPS */}
      <section className="apropos-section">
        <h2 className="apropos-section-title">Local Partnerships</h2>
        <p className="apropos-section-desc">
          Each regional center works with local organizations, government agencies, 
          and community leaders to ensure our programs are culturally appropriate and sustainable.
        </p>
        <div className="apropos-partenaires">
          {partners.map((p, i) => (
            <div key={i} className="partenaire-card">{p}</div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="apropos-section apropos-contact-section">
        <h2 className="apropos-section-title">Connect With Us</h2>
        <p className="apropos-section-desc">
          Interested in partnering with us or learning more about our work in your region? 
          We'd love to hear from you.
        </p>
        <div className="apropos-contact-info">
          <p><strong>Email:</strong> info@thesunrisecenters.com</p>
          <p><strong>Address:</strong> Antsirabe, Madagascar</p>
        </div>
      </section>

    </div>
  );
}

export default APropos;
