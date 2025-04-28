import { useTranslation } from "react-i18next";
import { FaCheckCircle } from 'react-icons/fa';  // Importing the React icon for check-circle

const ParticipationRequirements = () => {
  const { t } = useTranslation();
  const requirements = t('participation.requirements', { returnObjects: true });
  const stages = t('participation.stages', { returnObjects: true });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('participation.title')}</h2>

          <div className="bg-blue-50 p-8 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6">{t('participation.subtitle')}</h3>
            <ul className="space-y-4">
              {requirements.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <FaCheckCircle className="text-blue-900 mt-1 mr-3" />  {/* React Icon for check-circle */}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-6 rounded-xl">
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-blue-900">{stage.number}</span>
                  <h4 className="font-bold mt-2">{stage.title}</h4>
                  <p className="text-gray-600">{stage.deadline}</p>
                </div>
                <p className="text-center">{stage.seats}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParticipationRequirements;
