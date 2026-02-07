import type { OpenFormProps } from "../types/type";
import { problems } from "../constant/constant";
import { FiArrowRight } from "react-icons/fi";

const ProblemSection = ({
  setOpenForm,
  setId,
}: //settriggerUrl,
OpenFormProps) => {
  const triggerButton = () => {
    setOpenForm(true);
    setId("Marketing expert audit");
    // settriggerUrl?.("https://www.e-marketing.io/contact-us/");
    //setSave?.("/pdf/sample.pdf");
  };
  return (
    <section className="relative w-full bg-zinc-100 py-6 lg:py-14">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto px-4 lg:max-w-340 relative z-10 pt-10">
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex flex-col  items-center lg:items-start text-center lg:text-left">
            <h2 className="font-serif text-3xl sm:text-[40px] font-medium text-black leading-[1.5em] ">
              Your Landing Page Is Doing Everything Except Guiding{" "}
              <span className="text-(--yellow-emarketing) ">
                Visitors To Convert!
              </span>
            </h2>

            <div className="mt-5 h-1 w-20 rounded-full bg-(--yellow-emarketing)" />

            <p className="mt-6 text-lg text-(--yellow-emarketing)">
              Why is it so?
            </p>

            <div className="mt-10 w-full flex justify-center lg:justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl">
                {problems.map(({ id, text }) => (
                  <div key={id} className="flex items-start gap-3">
                    <div className="mt-2 w-2.5 h-2.5 rounded-full bg-(--yellow-emarketing) shrink-0" />
                    <p className="text-sm lg:text-base text-zinc-800 leading-snug">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center lg:items-start">
              <p className="text-base text-zinc-900">
                As a result, the visitor leaves within seconds without
                submitting enquiry!
              </p>
              <p className="mt-3 text-base text-zinc-900">
                But we can help you avoid these mistakes.
              </p>

              <button
                onClick={triggerButton}
                className="mt-6 rounded-2xl px-8 py-3.5 text-sm font-semibold shadow-lg hover:scale-105 transition bg-(--yellow-emarketing) text-black flex items-center gap-2"
              >
                Talk To Our Marketing Experts
                <FiArrowRight />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="relative w-full">
              <div className="absolute -inset-4 rounded-3xl bg-(--yellow-emarketing)/5 blur-xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Team working"
                  className="w-full h-140 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
