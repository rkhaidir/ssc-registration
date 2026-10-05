import { useLanguage } from '../../i18n/LanguageContext';

export default function RegistrationTabs({ activeTab, onChange }) {
  const { t } = useLanguage();

  return (
    <div className="registration-tabs">
      <button
        className={`tab-button ${activeTab === 'new' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('new')}
      >
        <i className="bi bi-person-plus-fill" /> {t('tabs.newParticipant')}
      </button>

      <button
        className={`tab-button ${activeTab === 'checkin' ? 'active' : ''}`}
        type="button"
        onClick={() => onChange('checkin')}
      >
        <i className="bi bi-check-circle-fill" /> {t('tabs.checkIn')}
      </button>
    </div>
  );
}
