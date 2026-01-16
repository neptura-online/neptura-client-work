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

const SectionSkeleton = ({ height = 400 }: { height?: number }) => (
  <div
    style={{ height }}
    className="my-16 w-full animate-pulse rounded-xl bg-gray-400/40"
  />
);

const BusinessLead = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [triggerUrl, setTriggerUrl] = useState("");
  const [save, setSave] = useState("");

  return (
    <div className="bg-gray-300 max-w-screen main-scroll-container">
      <Buttons setOpenForm={setOpenForm} setId={setId} />

      <HeroSection setOpenForm={setOpenForm} setId={setId} />
      <ProblemsSection
        setOpenForm={setOpenForm}
        setId={setId}
        setSave={setSave}
        settriggerUrl={setTriggerUrl}
      />

      <Suspense fallback={<SectionSkeleton height={250} />}>
        <NumbersSection />
      </Suspense>

      {openForm && (
        <Suspense fallback={null}>
          <Form
            isOpen={openForm}
            onClose={() => setOpenForm(false)}
            id={id}
            triggered={triggerUrl}
            save={save}
          />
        </Suspense>
      )}

      <Suspense fallback={<SectionSkeleton height={350} />}>
        <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={450} />}>
        <CaseStudies />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <ResultsSection setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={450} />}>
        <MarketingServicesShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <IndustriesHeroSection setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <FinalCTASection />
      </Suspense>
    </div>
  );
};

export default BusinessLead;
