import { FaExclamationCircle, FaCalendarCheck } from 'react-icons/fa';  // Import the required React Icon
import { useTranslation } from "react-i18next";

const RequiredDocuments = () => {
  const { t } = useTranslation();
  const deadlines = t('requiredDocuments.deadlines', { returnObjects: true });
  const importantWarnings = t('requiredDocuments.warnings', { returnObjects: true });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Deadlines Section */}
          <div className="bg-blue-50 p-8 rounded-xl mb-8">
            <ul className="space-y-4">
              {deadlines.map((date, idx) => (
                <li key={idx} className="flex items-start">
                  <FaCalendarCheck className="text-blue-900 mt-1 mr-3" />
                  <span>{date}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warnings Section with a red background */}
          <div className="bg-red-50 p-8 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6">{t('importantNotes.warningsTitle')}</h3>
            <ul className="space-y-4">
              {importantWarnings.map((warning, idx) => (
                <li key={idx} className="flex items-start">
                  <FaExclamationCircle className="text-red-600 mt-1 mr-3" />
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

export default RequiredDocuments;
