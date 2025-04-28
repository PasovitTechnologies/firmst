import { useTranslation } from "react-i18next";
import { FaChalkboardTeacher, FaBook, FaCertificate, FaPassport, FaUtensils } from 'react-icons/fa';  // Import relevant React Icons

const IncludedFeatures = () => {
  const { t } = useTranslation();
  const features = t('included.features', { returnObjects: true });

  // Map the icons to the corresponding React Icons
  const iconMap = {
    "fa-chalkboard-user": <FaChalkboardTeacher className="text-3xl" />,
    "fa-book": <FaBook className="text-3xl" />,
    "fa-certificate": <FaCertificate className="text-3xl" />,
    "fa-passport": <FaPassport className="text-3xl" />,
    "fa-utensils": <FaUtensils className="text-3xl" />
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('included.title')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-900 text-xl mb-4 text-center">
                {iconMap[feature.icon]}  {/* Render the appropriate icon */}
              </div>
              <div className="text-left">  {/* Align text to the left */}
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludedFeatures;
