import { useLanguage } from '../../i18n/LanguageContext';

export default function HeroSection({ currentRound, registrationOpen }) {
  const { t } = useLanguage();

  return (
    <div className="hero-card mb-4">
      <div className="row align-items-center g-4">
        <div className="col-lg-8">
          <span className="round-label">{t('hero.openRegistration')}</span>
          <h1 className="display-5 fw-bold mt-3 mb-3">
            SPEED STAR <span className="text-accent">CHAMPIONSHIP</span>
          </h1>
          <p className="hero-description mb-0">{t('hero.description')}</p>
        </div>

        <div className="col-lg-4">
          <div className="round-card">
            <small>{t('hero.currentRound')}</small>
            <h2>{currentRound?.name || t('hero.loadingRound')}</h2>
            <div className="registration-status mt-3">
              <span className={`status-dot ${registrationOpen ? '' : 'closed'}`} />
              <span>{registrationOpen ? t('nav.open') : t('nav.closed')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
