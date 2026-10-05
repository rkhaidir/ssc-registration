import { useState } from 'react';
import AlertMessage from '../ui/AlertMessage';
import SectionHeading from '../ui/SectionHeading';
import ParticipantResult from './ParticipantResult';
import { apiGet, apiPost } from '../../services/api';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CheckInPanel({ disabled, onSuccess }) {
  const { t } = useLanguage();
  const [guid, setGuid] = useState('');
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searching, setSearching] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

  async function searchParticipant() {
    const cleanGuid = guid.trim();
    setAlert(null);
    setResult(null);

    if (!cleanGuid) {
      setAlert({ type: 'warning', message: t('checkin.guidRequired') });
      return;
    }

    setSearching(true);
    try {
      const response = await apiGet('findParticipant', { steamGuid: cleanGuid });
      if (!response.success || !response.found) {
        throw new Error(response.message || t('checkin.participantNotFound'));
      }
      setResult(response);
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    } finally {
      setSearching(false);
    }
  }

  async function handleCheckIn() {
    setCheckingIn(true);
    setAlert(null);
    try {
      const response = await apiPost({ action: 'checkin', steamGuid: guid.trim() });
      if (!response.success) throw new Error(response.message);
      onSuccess(response.participant, response.round, 'checkin');
      setGuid('');
      setResult(null);
    } catch (error) {
      setAlert({ type: 'danger', message: error.message });
    } finally {
      setCheckingIn(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchParticipant();
    }
  }

  return (
    <div className="form-section">
      <SectionHeading title={t('checkin.title')}>
        {t('checkin.description')}
      </SectionHeading>

      <AlertMessage type={alert?.type}>{alert?.message}</AlertMessage>

      <label className="form-label">Steam GUID</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={guid}
          onChange={(e) => setGuid(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('checkin.placeholder')}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn racing-button"
          onClick={searchParticipant}
          disabled={disabled || searching}
        >
          {searching ? (
            <span className="spinner-border spinner-border-sm" />
          ) : (
            <><i className="bi bi-search me-1" /> {t('checkin.search')}</>
          )}
        </button>
      </div>

      <ParticipantResult
        participant={result?.participant}
        currentRound={result?.currentRound}
        checkedIn={result?.checkedIn}
        disabled={disabled}
        loading={checkingIn}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
}
