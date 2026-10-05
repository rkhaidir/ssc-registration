import { useLanguage } from '../../i18n/LanguageContext';
import logo97 from '../../assets/97-horizontal.png';

export default function Navbar({ registrationOpen }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark racing-navbar">
      <div className="container">
        <a className="navbar-brand" href="#top" aria-label="97 Sim Racing">
          <img
            src={logo97}
            alt="97 Sim Racing"
            className="navbar-logo"
          />
        </a>

        <div className="navbar-actions">
          <div className="language-switch" aria-label="Language switch">
            <button
              type="button"
              className={`language-button ${language === 'id' ? 'active' : ''}`}
              onClick={() => setLanguage('id')}
              aria-pressed={language === 'id'}
            >
              ID
            </button>
            <button
              type="button"
              className={`language-button ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <span
            className={`badge rounded-pill ${
              registrationOpen ? 'text-bg-success' : 'text-bg-danger'
            }`}
          >
            {registrationOpen ? t('nav.open') : t('nav.closed')}
          </span>
        </div>
      </div>
    </nav>
  );
}
