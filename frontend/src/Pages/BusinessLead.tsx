import HeroSection from "../ComponentsBusiness/HeroSection";
import NumbersSection from "../ComponentsBusiness/NumbersSection";
import ProblemsSection from "../ComponentsBusiness/ProblemsSection";

const BusinessLead = () => {
  return (
    <div className="bg-gray-300 max-w-screen overflow-hidden">
      <HeroSection />
      <ProblemsSection />
      <NumbersSection />
    </div>
  );
};

export default BusinessLead;
