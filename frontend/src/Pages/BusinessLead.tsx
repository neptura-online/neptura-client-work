import { useState, lazy, Suspense } from "react";
import HeroSection from "../ComponentsBusiness/HeroSection";
import ProblemsSection from "../ComponentsBusiness/ProblemsSection";
import Buttons from "../ComponentsBusiness/Helper/whatsapp";

const Form = lazy(() => import("../ComponentsBusiness/Helper/Form"));

const NumbersSection = lazy(
  () => import("../ComponentsBusiness/NumbersSection")
);
const WhyWorkWithUs = lazy(() => import("../ComponentsBusiness/WhyWorkWithUs"));
const CaseStudies = lazy(() => import("../ComponentsBusiness/CaseStudies"));
const ResultsSection = lazy(
  () => import("../ComponentsBusiness/ResultsSection")
);
const MarketingServicesShowcase = lazy(
  () => import("../ComponentsBusiness/MarketingServicesShowcase")
);
const IndustriesHeroSection = lazy(
  () => import("../ComponentsBusiness/IndustriesHeroSection")
);
const FinalCTASection = lazy(
  () => import("../ComponentsBusiness/FinalCTASection")
);

const BusinessLead = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [triggerUrl, setTriggerUrl] = useState(
    "https://digital.e-marketing.io/thank-you/"
  );
  const [save, setSave] = useState("");

  return (
    <div className="bg-gray-300 max-w-screen overflow-hidden">
      <Buttons setOpenForm={setOpenForm} setId={setId} />

      <HeroSection setOpenForm={setOpenForm} setId={setId} />
      <ProblemsSection
        setOpenForm={setOpenForm}
        setId={setId}
        setSave={setSave}
        settriggerUrl={setTriggerUrl}
      />
      <Suspense fallback={null}>
        <NumbersSection />
      </Suspense>

      <Suspense fallback={null}>
        <Form
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
          id={id}
          triggered={triggerUrl}
          save={save}
        />

        <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />

        <CaseStudies />

        <ResultsSection setOpenForm={setOpenForm} setId={setId} />

        <MarketingServicesShowcase />

        <IndustriesHeroSection setOpenForm={setOpenForm} setId={setId} />

        <FinalCTASection />
      </Suspense>
    </div>
  );
};

export default BusinessLead;
