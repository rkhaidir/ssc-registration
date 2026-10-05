import { useLanguage } from '../../i18n/LanguageContext';

export default function RacingFields({
  racingNumber,
  steamGuid,
  numberStatus,
  guidFeedback,
  onNumberChange,
  onGuidChange,
  onGuidBlur,
  disabled,
}) {
  const { t } = useLanguage();

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">{t('form.racingNumber')}</label>
        <div className="input-group">
          <span className="input-group-text">#</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength="3"
            className="form-control"
            value={racingNumber}
            onChange={onNumberChange}
            placeholder="97"
            disabled={disabled}
            required
          />
        </div>
        {racingNumber && (
          <div
            className={`validation-message ${
              numberStatus.valid ? 'validation-success' : 'validation-error'
            }`}
          >
            {numberStatus.message}
          </div>
        )}
      </div>

      <div className="col-md-6">
        <label className="form-label">{t('form.steamGuid')}</label>
        <input
          type="text"
          className="form-control"
          value={steamGuid}
          onChange={onGuidChange}
          onBlur={onGuidBlur}
          placeholder="76561198xxxxxxxxx"
          disabled={disabled}
          required
        />
        {guidFeedback && (
          <div
            className={`validation-message ${
              guidFeedback.type === 'success'
                ? 'validation-success'
                : guidFeedback.type === 'error'
                  ? 'validation-error'
                  : 'text-secondary'
            }`}
          >
            {guidFeedback.message}
          </div>
        )}
      </div>
    </>
  );
}
