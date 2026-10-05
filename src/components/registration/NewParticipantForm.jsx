import { useState } from 'react';
import AlertMessage from '../ui/AlertMessage';
import LoadingButton from '../ui/LoadingButton';
import SectionHeading from '../ui/SectionHeading';
import { apiGet, apiPost } from '../../services/api';
import { sanitizeRacingNumber, validateRacingNumber } from '../../utils/validation';
import DriverIdentityFields from './DriverIdentityFields';
import RacingFields from './RacingFields';
import SocialFields from './SocialFields';
import { useLanguage } from '../../i18n/LanguageContext';

const initialForm = {
  fullName: '',
  teamName: '',
  racingNumber: '',
  steamGuid: '',
  discordUsername: '',
  instagramUsername: '',
};

export default function NewParticipantForm({
  disabled,
  usedNumbers,
  onRegistered,
  onNumbersChanged,
}) {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [alert, setAlert] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [guidFeedback, setGuidFeedback] = useState(null);

  const numberStatus = validateRacingNumber(form.racingNumber, usedNumbers, t);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleNumberChange(event) {
    updateField('racingNumber', sanitizeRacingNumber(event.target.value));
  }

  async function checkGuid() {
    const guid = form.steamGuid.trim();
    if (!guid) {
      setGuidFeedback(null);
      return;
    }

    setGuidFeedback({ type: 'muted', message: t('form.checkingGuid') });
    try {
      const result = await apiGet('findParticipant', { steamGuid: guid });
      setGuidFeedback(
        result.found
          ? { type: 'error', message: t('form.guidUsed') }
          : { type: 'success', message: t('form.guidAvailable') },
      );
    } catch {
      setGuidFeedback({ type: 'error', message: t('form.guidCheckFailed') });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setAlert(null);

    const numberValidation = validateRacingNumber(form.racingNumber, usedNumbers, t);
    if (!numberValidation.valid) {
      setAlert({ type: 'danger', message: numberValidation.message });
      return;
    }

    setSubmitting(true);
    try {
      const result = await apiPost({
        action: 'register',
        fullName: form.fullName.trim(),
        teamName: form.teamName.trim(),
        racingNumber: Number(form.racingNumber),
        steamGuid: form.steamGuid.trim(),
        discordUsername: form.discordUsername.trim(),
        instagramUsername: form.instagramUsername.trim(),
      });

      if (!result.success) throw new Error(result.message);

      setForm(initialForm);
      setGuidFeedback(null);
      await onNumbersChanged();
      onRegistered(result.participant, result.round, 'registration');
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-section">
      <SectionHeading title={t('form.newTitle')}>
        {t('form.newDescription')}
      </SectionHeading>

      <AlertMessage type={alert?.type}>{alert?.message}</AlertMessage>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <DriverIdentityFields
            form={form}
            onChange={updateField}
            disabled={disabled}
          />

          <RacingFields
            racingNumber={form.racingNumber}
            steamGuid={form.steamGuid}
            numberStatus={numberStatus}
            guidFeedback={guidFeedback}
            onNumberChange={handleNumberChange}
            onGuidChange={(e) => updateField('steamGuid', e.target.value)}
            onGuidBlur={checkGuid}
            disabled={disabled}
          />

          <SocialFields
            form={form}
            onChange={updateField}
            disabled={disabled}
          />

          <div className="col-12 mt-4">
            <LoadingButton
              type="submit"
              className="btn racing-button w-100"
              loading={submitting}
              loadingText={t('form.submitting')}
              disabled={disabled}
            >
              {t('form.submit')} <i className="bi bi-arrow-right ms-2" />
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
}
