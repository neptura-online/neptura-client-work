import CaseStudies from "../ComponentsBusiness/CaseStudies";
import FinalCTASection from "../ComponentsBusiness/FinalCTASection";
import HeroSection from "../ComponentsBusiness/HeroSection";
import IndustriesHeroSection from "../ComponentsBusiness/IndustriesHeroSection";
import MarketingServicesShowcase from "../ComponentsBusiness/MarketingServicesShowcase";
import NumbersSection from "../ComponentsBusiness/NumbersSection";
import ProblemsSection from "../ComponentsBusiness/ProblemsSection";
import ResultsSection from "../ComponentsBusiness/ResultsSection";
import WhyWorkWithUs from "../ComponentsBusiness/WhyWorkWithUs";

const BusinessLead = () => {
  return (
    <div className="bg-gray-300 max-w-screen overflow-hidden">
      <HeroSection />
      <ProblemsSection />
      <NumbersSection />
      <WhyWorkWithUs />
      <CaseStudies />
      <ResultsSection />
      <MarketingServicesShowcase />
      <IndustriesHeroSection />
      <FinalCTASection />
    </div>
  );
};

export default BusinessLead;
