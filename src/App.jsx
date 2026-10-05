import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/registration/HeroSection';
import RegistrationTabs from './components/registration/RegistrationTabs';
import NewParticipantForm from './components/registration/NewParticipantForm';
import UsedNumbersCard from './components/registration/UsedNumbersCard';
import InfoCard from './components/registration/InfoCard';
import CheckInPanel from './components/checkin/CheckInPanel';
import SuccessPage from './components/success/SuccessPage';
import { apiGet } from './services/api';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t } = useLanguage();
  const [config, setConfig] = useState(null);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [activeTab, setActiveTab] = useState('new');
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  const loadUsedNumbers = useCallback(async () => {
    const result = await apiGet('usedNumbers');
    if (!result.success) throw new Error(result.message || t('errors.usedNumbers'));
    setUsedNumbers(result.numbers || []);
  }, [t]);

  useEffect(() => {
    async function init() {
      try {
        const configResult = await apiGet('config');
        if (!configResult.success) throw new Error(configResult.message);
        setConfig(configResult);
        await loadUsedNumbers();
      } catch (err) {
        setError(err.message || t('errors.registrationData'));
      }
    }
    init();
  }, [loadUsedNumbers, t]);

  function showSuccess(participant, round, type) {
    setSuccessData({ participant, round, type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (successData) {
    return (
      <>
        <div id="top" />
        <Navbar registrationOpen={Boolean(config?.registrationOpen)} />
        <main className="container py-5">
          <SuccessPage
            data={successData}
            discordUrl={config?.discordUrl}
            onBack={() => setSuccessData(null)}
          />
        </main>
        <Footer />
      </>
    );
  }

  const registrationOpen = Boolean(config?.registrationOpen);

  return (
    <>
      <div id="top" />
      <Navbar registrationOpen={registrationOpen} />

      <main className="container py-5">
        <HeroSection
          currentRound={config?.currentRound}
          registrationOpen={registrationOpen}
        />

        {error && <div className="alert alert-danger mb-4">{error}</div>}

        {config && !registrationOpen && (
          <div className="alert alert-danger mb-4">
            <div className="d-flex gap-3">
              <i className="bi bi-lock-fill fs-3" />
              <div>
                <strong>{t('closed.title')}</strong>
                <div>{t('closed.description')}</div>
              </div>
            </div>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="registration-card">
              <RegistrationTabs activeTab={activeTab} onChange={setActiveTab} />

              {activeTab === 'new' ? (
                <NewParticipantForm
                  disabled={!registrationOpen}
                  usedNumbers={usedNumbers}
                  onNumbersChanged={loadUsedNumbers}
                  onRegistered={showSuccess}
                />
              ) : (
                <CheckInPanel
                  disabled={!registrationOpen}
                  onSuccess={showSuccess}
                />
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <UsedNumbersCard numbers={usedNumbers} />
            <InfoCard />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
