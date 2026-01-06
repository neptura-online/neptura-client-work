import { useState, lazy, Suspense } from "react";
import NavBar from "../Components/NavBar";
import HeroSectionVideoBG from "../Components/Hero/HeroSectionVideoBG";
import Counter from "../Components/Counter";
import OfferContainer from "../Components/OfferContainer";

const ExitIntentWrapper = lazy(
  () => import("../Components/Helper/ExitIntentWrapper")
);

const Form = lazy(() => import("../Components/Helper/Form"));

const ProblemSection = lazy(() => import("../Components/ProblemSection"));
const LandingProblemSection = lazy(
  () => import("../Components/LandingProblemSection")
);
const ConversionPhilosophy = lazy(
  () => import("../Components/ConversionPhilosophy")
);
const WhyWorkWithUs = lazy(() => import("../Components/WhyWorkWithUs"));
const ProcessCarousel = lazy(() => import("../Components/ProcessCarousel"));
const AdvancedServices = lazy(() => import("../Components/AdvancedServices"));
const CaseStudiesSection = lazy(() => import("../Components/CaseStudySection"));
// const CaseStudiesSection = lazy(
//   () => import("../ComponentsBusiness/CaseStudies")
// );
const ThreeDCarousel = lazy(() => import("../Components/Carosoal"));
const AuthoritySection = lazy(() => import("../Components/AuthoritySection"));
const Testimonials = lazy(() => import("../Components/Testimonial"));
const FAQSection = lazy(() => import("../Components/FAQQuestion"));
const Footer = lazy(() => import("../Components/Footer"));

const LandingPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [triggerUrl, setTriggerUrl] = useState(
    "https://digital.e-marketing.io/thank-you/"
  );
  const [save, setSave] = useState("");

  return (
    <>
      <NavBar />
      <HeroSectionVideoBG setOpenForm={setOpenForm} setId={setId} />
      <Counter />
      <OfferContainer setOpenForm={setOpenForm} setId={setId} />
      <Suspense fallback={null}>
        <ProblemSection
          setOpenForm={setOpenForm}
          setId={setId}
          settriggerUrl={setTriggerUrl}
          setSave={setSave}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ExitIntentWrapper />
        <Form
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
          id={id}
          triggered={triggerUrl}
          save={save}
        />

        <LandingProblemSection setOpenForm={setOpenForm} setId={setId} />
        <ConversionPhilosophy setOpenForm={setOpenForm} setId={setId} />
        <WhyWorkWithUs setOpenForm={setOpenForm} setId={setId} />

        <ProcessCarousel />
        <AdvancedServices />

        <CaseStudiesSection setOpenForm={setOpenForm} setId={setId} />
        <ThreeDCarousel setOpenForm={setOpenForm} setId={setId} />
        <AuthoritySection setOpenForm={setOpenForm} setId={setId} />

        <Testimonials />
        <FAQSection />
        <Footer />
      </Suspense>
    </>
  );
};

export default LandingPage;
