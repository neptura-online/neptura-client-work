import { useState, lazy, Suspense } from "react";
import NavBar from "../Components/NavBar";
import HeroSectionVideoBG from "../Components/Hero/HeroSectionVideoBG";
import Counter from "../Components/Counter";
import OfferContainer from "../Components/OfferContainer";
import ProblemSection from "../Components/ProblemSection";
import LandingProblemSection from "../Components/LandingProblemSection";
import Buttons from "../ComponentsBusiness/Helper/whatsapp";

const ExitIntentWrapper = lazy(
  () => import("../Components/Helper/ExitIntentWrapper")
);

const Form = lazy(() => import("../Components/Helper/Form"));

const ConversionPhilosophy = lazy(
  () => import("../Components/ConversionPhilosophy")
);
const WhyWorkWithUs = lazy(() => import("../Components/WhyWorkWithUs"));
const ProcessCarousel = lazy(() => import("../Components/ProcessCarousel"));
const AdvancedServices = lazy(() => import("../Components/AdvancedServices"));
const CaseStudiesSection = lazy(() => import("../Components/CaseStudySection"));
const ThreeDCarousel = lazy(() => import("../Components/Carosoal"));
const AuthoritySection = lazy(() => import("../Components/AuthoritySection"));
const Testimonials = lazy(() => import("../Components/Testimonial"));
const FAQSection = lazy(() => import("../Components/FAQQuestion"));
const Footer = lazy(() => import("../Components/Footer"));

const SectionSkeleton = ({ height = 400 }: { height?: number }) => (
  <div
    style={{ height }}
    className="my-16 w-full animate-pulse rounded-xl bg-zinc-900/60"
  />
);

const LandingPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [triggerUrl, setTriggerUrl] = useState(
    "https://digital.e-marketing.io/thank-you/"
  );
  const [save, setSave] = useState("");

  return (
    <>
      <div className="hidden sm:block">
        <NavBar />
      </div>
      <Buttons setOpenForm={setOpenForm} setId={setId} />
      <HeroSectionVideoBG setOpenForm={setOpenForm} setId={setId} />
      <Counter />
      <OfferContainer setOpenForm={setOpenForm} setId={setId} />
      <ProblemSection
        setOpenForm={setOpenForm}
        setId={setId}
        settriggerUrl={setTriggerUrl}
        setSave={setSave}
      />
      <LandingProblemSection setOpenForm={setOpenForm} setId={setId} />

      <Suspense fallback={null}>
        <ExitIntentWrapper />
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

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <ConversionPhilosophy setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <ProcessCarousel />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={450} />}>
        <AdvancedServices />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={450} />}>
        <CaseStudiesSection setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={500} />}>
        <ThreeDCarousel setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <AuthoritySection setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={350} />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={350} />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={250} />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default LandingPage;
