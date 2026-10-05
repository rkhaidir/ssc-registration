import { useLanguage } from '../../i18n/LanguageContext';

export default function SuccessPage({ data, discordUrl, onBack }) {
  const { t } = useLanguage();
  const isCheckIn = data.type === 'checkin';

  return (
    <section>
      <div className="success-container">
        <div className="success-icon">
          <i className="bi bi-check-lg" />
        </div>

        <span className="success-label">{t('success.label')}</span>
        <h1>{isCheckIn ? t('success.checkinTitle') : t('success.registrationTitle')}</h1>
        <p>
          {isCheckIn
            ? t('success.checkinDescription')
            : t('success.registrationDescription')}
        </p>

        <div className="success-driver-card">
          <div>
            <small>{t('success.driver')}</small>
            <strong>{data.participant.fullName}</strong>
          </div>
          <div>
            <small>{t('success.racingNumber')}</small>
            <strong>#{data.participant.racingNumber}</strong>
          </div>
          <div>
            <small>{t('success.round')}</small>
            <strong>{data.round.name}</strong>
          </div>
        </div>

        <div className="mt-4">
          <a
            href={discordUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="btn discord-button"
          >
            <i className="bi bi-discord me-2" /> {t('success.discord')}
          </a>
        </div>

        <button type="button" className="btn btn-link text-light mt-3" onClick={onBack}>
          <i className="bi bi-arrow-left me-1" /> {t('success.back')}
        </button>
      </div>
    </section>
  );
}
