import { useTranslation } from "react-i18next";
import { FaCalendarCheck } from "react-icons/fa";  // Import React Icon

const PaymentInfo = () => {
  const { t } = useTranslation();
  const participationTypes = t('paymentInfo.participations', { returnObjects: true }) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('paymentInfo.title')}</h2>

          <div className="space-y-8">
            {participationTypes.map((type, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">{type.title}</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">{type.description}</p>
                  <ul className="space-y-3">
                    {type.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-center">
                        <FaCalendarCheck className="text-blue-900 mr-3" /> {/* React Icon */}
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PaymentInfo;
