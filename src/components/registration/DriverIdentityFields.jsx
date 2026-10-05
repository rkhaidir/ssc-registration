import { useLanguage } from '../../i18n/LanguageContext';

export default function DriverIdentityFields({ form, onChange, disabled }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">{t('form.fullName')}</label>
        <input
          type="text"
          className="form-control"
          value={form.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          placeholder={t('form.fullNamePlaceholder')}
          disabled={disabled}
          required
        />
      </div>

      <div className="col-md-6">
        <label className="form-label">{t('form.teamName')}</label>
        <input
          type="text"
          className="form-control"
          value={form.teamName}
          onChange={(e) => onChange('teamName', e.target.value)}
          placeholder={t('form.teamNamePlaceholder')}
          disabled={disabled}
          required
        />
      </div>
    </>
  );
}
