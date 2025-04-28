import { useTranslation } from "react-i18next";
import PricingCard from "./PricingCard";

const PricingOptions = () => {
  const { t } = useTranslation();
  const cards = t('pricingOptions.cards', { returnObjects: true });

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('pricingOptions.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <PricingCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingOptions;
