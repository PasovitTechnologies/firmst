import { useTranslation } from "react-i18next";

const PricingCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-lg mb-8">{t('cta.subtitle')}</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-100 transition duration-300">
              {t('cta.apply')}
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-800 transition duration-300">
              {t('cta.contact')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;
