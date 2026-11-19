import Map from '../Map';
import './Contact.css';

function Contact() {
  return (
    <div className="page-contact">
      <h1 className="contact-title">CONTACT</h1>
      <p className="contact-subtitle">Retrouvez-nous ou contactez-nous directement</p>

      {/* CARTE */}
      <section className="contact-section">
        <h2 className="contact-section-title">📍 Nous trouver</h2>
        <Map />
      </section>

      {/* COORDONNÉES */}
<div className="contact-info-grid">
  <div className="contact-info-card">
    <span className="contact-icon">✉</span>
    <h3>Email</h3>
    <a href="mailto:nekenaherinirina03@gmail.com">nekenaherinirina03@gmail.com</a>
  </div>
  <div className="contact-info-card">
    <span className="contact-icon">☎</span>
    <h3>Téléphone</h3>
    <a href="tel:+261333852978">033 38 529 78</a>
  </div>
  <div className="contact-info-card">
    <span className="contact-icon">⌂</span>
    <h3>Adresse</h3>
    <p>Antsirabe, Madagascar</p>
  </div>
  <div className="contact-info-card">
    <span className="contact-icon">f</span>
    <h3>Facebook</h3>
    <a href="https://www.facebook.com/nekena.herinirina/" target="_blank" rel="noopener noreferrer">
      Nekena Herinirina
    </a>
  </div>
  <div className="contact-info-card">
    <span className="contact-icon">✆</span>
    <h3>WhatsApp</h3>
    <a href="https://wa.me/261341050592" target="_blank" rel="noopener noreferrer">
      034 10 505 92
    </a>
  </div>
</div>

      {/* FORMULAIRE */}
      <section className="contact-section">
        <h2 className="contact-section-title">✉️ Envoyez-nous un message</h2>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Nom complet" required />
            <input type="email" placeholder="Email" required />
          </div>
          <input type="text" placeholder="Sujet" required />
          <textarea placeholder="Votre message..." rows="6" required></textarea>
          <button type="submit" className="contact-submit">Envoyer</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
