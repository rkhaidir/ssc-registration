import { useLanguage } from '../../i18n/LanguageContext';

export default function UsedNumbersCard({ numbers }) {
  const { t } = useLanguage();

  return (
    <div className="number-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <small className="text-secondary">{t('usedNumbers.label')}</small>
          <h4 className="mb-0">{t('usedNumbers.title')}</h4>
        </div>
        <div className="number-count">{numbers.length}</div>
      </div>

      <p className="number-description">{t('usedNumbers.description')}</p>

      <div className="used-number-grid">
        {numbers.map((number) => (
          <div className="used-number" key={number}>
            #{number}
          </div>
        ))}
      </div>
    </div>
  );
}
