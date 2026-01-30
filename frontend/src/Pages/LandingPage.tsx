import { useState, lazy, Suspense, useEffect } from "react";
import NavBar from "../Components/NavBar";
import HeroSectionVideoBG from "../Components/Hero/HeroSectionVideoBG";
import MobileHeroVideo from "../Components/Hero/MobileHeroVideo";
import Counter from "../Components/Counter";
import OfferContainer from "../Components/OfferContainer";
import ProblemSection from "../Components/ProblemSection";
import Buttons from "../ComponentsBusiness/Helper/whatsapp";

const ExitIntentWrapper = lazy(
  () => import("../Components/Helper/ExitIntentWrapper")
);
const Form = lazy(() => import("../Components/Helper/Form"));

const GallerySection = lazy(
  () => import("../Components/Gallery/ GallerySection")
);
const LandingProblemSection = lazy(
  () => import("../Components/LandingProblemSection")
);
const ConversionPhilosophy = lazy(
  () => import("../Components/ConversionPhilosophy")
);
const YouKnow = lazy(() => import("../Components/YouKnow"));
const WhyWorkWithUs = lazy(() => import("../Components/WhyWorkWithUs"));
const ProcessCarousel = lazy(() => import("../Components/ProcessCarousel"));
const AdvancedServices = lazy(() => import("../Components/AdvancedServices"));
const TechStackStrip = lazy(() => import("../Components/TechStackStrip"));
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
  const [triggerUrl, setTriggerUrl] = useState("/thankyou");
  const [save, setSave] = useState("");
  const [showExit, setShowExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowExit(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <NavBar />
      </div>

      <Buttons setOpenForm={setOpenForm} setId={setId} />

      <section className="hidden lg:flex">
        <HeroSectionVideoBG setOpenForm={setOpenForm} setId={setId} />
      </section>

      <section className="lg:hidden">
        <MobileHeroVideo setOpenForm={setOpenForm} setId={setId} />
      </section>

      <Counter />
      <OfferContainer setOpenForm={setOpenForm} setId={setId} />
      <ProblemSection
        setOpenForm={setOpenForm}
        setId={setId}
        settriggerUrl={setTriggerUrl}
        setSave={setSave}
      />

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <GallerySection />
        <LandingProblemSection setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      {showExit && (
        <Suspense fallback={null}>
          <ExitIntentWrapper />
        </Suspense>
      )}

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
        <YouKnow />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <ConversionPhilosophy setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={300} />}>
        <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={400} />}>
        <ProcessCarousel setOpenForm={setOpenForm} setId={setId} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height={450} />}>
        <AdvancedServices />
        <TechStackStrip />
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
