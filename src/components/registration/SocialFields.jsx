import { useLanguage } from '../../i18n/LanguageContext';

export default function SocialFields({ form, onChange, disabled }) {
  const { t } = useLanguage();

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">{t('form.discord')}</label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-discord" />
          </span>
          <input
            type="text"
            className="form-control"
            value={form.discordUsername}
            onChange={(e) => onChange('discordUsername', e.target.value)}
            placeholder="username"
            disabled={disabled}
            required
          />
        </div>
      </div>

      <div className="col-md-6">
        <label className="form-label">{t('form.instagram')}</label>
        <div className="input-group">
          <span className="input-group-text">@</span>
          <input
            type="text"
            className="form-control"
            value={form.instagramUsername}
            onChange={(e) => onChange('instagramUsername', e.target.value)}
            placeholder="username"
            disabled={disabled}
            required
          />
        </div>
      </div>
    </>
  );
}
