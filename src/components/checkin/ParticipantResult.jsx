import LoadingButton from '../ui/LoadingButton';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ParticipantResult({
  participant,
  currentRound,
  checkedIn,
  disabled,
  loading,
  onCheckIn,
}) {
  const { t } = useLanguage();
  if (!participant) return null;

  return (
    <div className="participant-result mt-4">
      <div className="driver-header">
        <div className="driver-number">{participant.racingNumber}</div>
        <div>
          <small>{t('checkin.found')}</small>
          <h4 className="mb-0">{participant.fullName}</h4>
        </div>
      </div>

      <div className="driver-data">
        <div>
          <small>{t('checkin.team')}</small>
          <strong>{participant.teamName || '-'}</strong>
        </div>
        <div>
          <small>{t('checkin.status')}</small>
          <strong>{checkedIn ? t('checkin.checked') : t('checkin.notChecked')}</strong>
        </div>
        <div>
          <small>{t('checkin.round')}</small>
          <strong>{currentRound?.name || '-'}</strong>
        </div>
      </div>

      <LoadingButton
        type="button"
        className="btn racing-button w-100 mt-4"
        loading={loading}
        loadingText={t('checkin.processing')}
        disabled={disabled || checkedIn}
        onClick={onCheckIn}
      >
        <i className={`bi ${checkedIn ? 'bi-check-circle-fill' : 'bi-check-circle'} me-2`} />
        {checkedIn ? t('checkin.checked') : t('checkin.action')}
      </LoadingButton>
    </div>
  );
}
