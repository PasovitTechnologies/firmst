import React from 'react';
import { useTranslation } from 'react-i18next';

const RequirementsSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="participation-requirements" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('requirements.title')}
          </h2>
          
          <div className="bg-blue-50 p-8 rounded-xl mb-8">
            <h3 className="text-xl font-bold mb-6">
              {t('requirements.subtitle')}
            </h3>
            <ul className="space-y-4">
              {t('requirements.items', { returnObjects: true }).map((item, index) => (
                <li key={index} className="flex items-start">
                  <i className="fa-solid fa-check-circle text-blue-900 mt-1 mr-3"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequirementsSection;