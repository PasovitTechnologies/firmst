import { useTranslation } from "react-i18next";
import { FaUtensils, FaExclamationCircle } from 'react-icons/fa';  // Importing React Icons

const ImportantNotes = () => {
  const { t } = useTranslation();
  const accommodationNotes = t('importantNotes.accommodation', { returnObjects: true }) || [];
  const importantWarnings = t('importantNotes.warnings', { returnObjects: true }) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('importantNotes.title')}</h2>

          <div className="bg-blue-50 p-8 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6">{t('importantNotes.accommodationTitle')}</h3>
            <ul className="space-y-4">
              {accommodationNotes.map((note, idx) => (
                <li key={idx} className="flex items-start">
                  <FaUtensils className="text-blue-900 mt-1 mr-3" />  {/* Using React Icon here */}
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-6">{t('importantNotes.warningsTitle')}</h3>
            <ul className="space-y-4">
              {importantWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start">
                  <FaExclamationCircle className="text-red-600 mt-1 mr-3" />  {/* Using React Icon here */}
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImportantNotes;
