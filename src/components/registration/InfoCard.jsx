import { useLanguage } from '../../i18n/LanguageContext';

export default function InfoCard() {
  const { t } = useLanguage();

  return (
    <div className="info-card mt-4">
      <h5>
        <i className="bi bi-info-circle-fill me-2" /> {t('info.title')}
      </h5>
      <ul>
        <li>{t('info.guid')}</li>
        <li>{t('info.number')}</li>
        <li>{t('info.checkin')}</li>
        <li>{t('info.discord')}</li>
      </ul>
    </div>
  );
}
