import { useState } from "react";
import CaseStudies from "../ComponentsBusiness/CaseStudies";
import FinalCTASection from "../ComponentsBusiness/FinalCTASection";
import Form from "../ComponentsBusiness/Helper/Form";
import HeroSection from "../ComponentsBusiness/HeroSection";
import IndustriesHeroSection from "../ComponentsBusiness/IndustriesHeroSection";
import MarketingServicesShowcase from "../ComponentsBusiness/MarketingServicesShowcase";
import NumbersSection from "../ComponentsBusiness/NumbersSection";
import ProblemsSection from "../ComponentsBusiness/ProblemsSection";
import ResultsSection from "../ComponentsBusiness/ResultsSection";
import WhyWorkWithUs from "../ComponentsBusiness/WhyWorkWithUs";

const BusinessLead = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState<string>("");
  const [triggerUrl, setTriggerUrl] = useState<string>(
    "https://digital.e-marketing.io/thank-you/"
  );
  const [save, setSave] = useState<string>("");
  return (
    <div className="bg-gray-300 max-w-screen overflow-hidden">
      <Form
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        id={id}
        triggered={triggerUrl}
        save={save}
      />
      <HeroSection setOpenForm={setOpenForm} setId={setId} />
      <ProblemsSection
        setOpenForm={setOpenForm}
        setId={setId}
        setSave={setSave}
        settriggerUrl={setTriggerUrl}
      />
      <NumbersSection />
      <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />
      <CaseStudies />
      <ResultsSection setOpenForm={setOpenForm} setId={setId} />
      <MarketingServicesShowcase />
      <IndustriesHeroSection setOpenForm={setOpenForm} setId={setId} />
      <FinalCTASection />
    </div>
  );
};

export default BusinessLead;
