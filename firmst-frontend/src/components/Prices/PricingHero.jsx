import { useTranslation } from "react-i18next";

const PricingHero = () => {
  const { t } = useTranslation();
  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('pricingHero.title')}</h1>
        <p className="text-xl max-w-3xl mx-auto">{t('pricingHero.subtitle')}</p>
      </div>
    </section>
  );
};

export default PricingHero;
