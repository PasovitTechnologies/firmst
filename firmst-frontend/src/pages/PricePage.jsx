import Documents from "@/components/Prices/Documents";
import ImportantNotes from "@/components/Prices/ImportantNotes";
import IncludedFeatures from "@/components/Prices/IncludedFeatures";
import ParticipationRequirements from "@/components/Prices/ParticipationRequirements";
import PaymentInfo from "@/components/Prices/PaymentInfo";
import PricingCTA from "@/components/Prices/PricingCTA";
import PricingHero from "@/components/Prices/PricingHero";
import PricingOptions from "@/components/Prices/PricingOptions";
import RequiredDocuments from "@/components/Prices/RequiredDocuments";


const PricePage = () => {
  return (
    <div className="h-full text-base-content">
  

      
      <PricingHero />
      <PricingOptions />
      <RequiredDocuments />
      <ParticipationRequirements />
      <Documents/>
      <IncludedFeatures />

      <PaymentInfo />
      <PricingCTA />
      <ImportantNotes />
 
    </div>
  );
};

export default PricePage;
