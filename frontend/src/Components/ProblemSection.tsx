import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { problems } from "../constant/constant";
import { FiArrowRight } from "react-icons/fi";

const gridMotion = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

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
    <section className="relative w-full bg-zinc-100 py-10 lg:py-20 text-white">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="mx-auto px-4 lg:max-w-340 relative z-10 flex flex-col items-center">
        <div className="mx-auto  text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-black leading-[1.5em] capitalize"
          >
            Your Landing Page is doing everything <br /> except guiding{" "}
            <span className="text-(--yellow-emarketing)">
              visitors to convert!
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-(--yellow-emarketing)"
          />
          <p className="mt-6 text-2xl text-(--yellow-emarketing)">
            Why is it so?
          </p>
        </div>

        <motion.div
          variants={gridMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4 w-full"
        >
          {problems.map(({ id, text, url }) => (
            <div
              key={id}
              className="group flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-4 lg:p-8 font-bold text-zinc-900 transition hover:border-yellow-500 items-center "
            >
              <div className=" flex items-center justify-center rounded-xl">
                <img
                  src={`${url}`}
                  alt={text}
                  className="h-12 lg:h-18 w-auto grayscale "
                />
              </div>
              <h6 className="text-sm lg:text-base text-center whitespace-pre-line">
                {text}
              </h6>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-base text-zinc-900 ">
            As a result, the visitor leaves within seconds without submitting
            enquiry!
          </p>

          <p className="mt-3 text-base text-zinc-900 ">
            But we can help you avoid these mistakes.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={triggerButton}
            className="rounded-2xl px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 bg-(--yellow-emarketing) lg:text-md flex items-center gap-2 cursor-pointer"
          >
            Talk To Our Marketing Experts
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
