import { AuthoritySection } from "../Components/AuthoritySection";
import ThreeDCarousel from "../Components/Carosoal";
import CaseStudiesSection from "../Components/CaseStudySection";
import Counter from "../Components/Counter";
import FAQSection from "../Components/FAQQuestion";
import Footer from "../Components/Footer";
import OfferContainer from "../Components/OfferContainer";
import ProblemSection from "../Components/ProblemSection";
import { Testimonials } from "../Components/Testimonial";
import ExitIntentWrapper from "../Components/Helper/ExitIntentWrapper";
import { useState } from "react";
import Form from "../Components/Helper/Form";
import LandingProblemSection from "../Components/LandingProblemSection";
import AdvancedServices from "../Components/AdvancedServices";
import ConversionPhilosophy from "../Components/ConversionPhilosophy";
import WhyWorkWithUs from "../Components/WhyWorkWithUs";
import NavBar from "../Components/NavBar";
import ProcessCarousel from "../Components/ProcessCarousel";
import HeroSectionVideoBG from "../Components/Hero/HeroSectionVideoBG";

const LandingPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState<string>("");
  const [triggerUrl, setTriggerUrl] = useState<string>(
    "https://digital.e-marketing.io/thank-you/"
  );
  const [save, setSave] = useState<string>("");
  return (
    <>
      <ExitIntentWrapper />
      <Form
        isOpen={openForm}
        onClose={() => setOpenForm(false)}
        id={id}
        triggered={triggerUrl}
        save={save}
      />
      <NavBar />
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
    </>
  );
};

export default LandingPage;
