import { motion } from "framer-motion";
import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";
import { problems } from "../constant/constant";
import WorkIcon from "./Helper/PreetyIcon";

const gridMotion = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const ProblemSection = ({
  setOpenForm,
  setId,
  settriggerUrl,
}: OpenFormProps) => {
  const triggerButton = () => {
    setOpenForm(true);
    setId("Marketing expert audit");
    settriggerUrl?.("https://www.e-marketing.io/contact-us/");
    //setSave?.("/pdf/sample.pdf");
  };
  return (
    <section className="relative w-full bg-stone-950 py-10 lg:mt-10 lg:pt-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('assets/noise.svg')] opacity-10" />
      <div className="mx-auto px-4 lg:max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Heading white="Why Your Landing Page Not" yellow="Convert ?" />
        </div>

        <motion.div
          variants={gridMotion}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {problems.map(({ id, text, url }) => (
            <div
              key={id}
              className="group flex flex-col gap-4 rounded-2xl border border-stone-800 bg-stone-900 p-6 font-bold text-stone-300 transition hover:border-yellow-500"
            >
              <div className=" flex h-12 w-12 items-center justify-center rounded-xl bg-stone-800 text-yellow-400">
                <WorkIcon url={url} alt={text} />
              </div>
              <p className="text-base">{text}</p>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm text-stone-300 ">
            As a result, the visitor leaves within seconds without submitting
            enquiry!
          </p>

          <p className="mt-3 text-base text-stone-300 ">
            But here’s the good news. We can fix that.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={triggerButton}
            className="rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-yellow-400 lg:text-md"
          >
            Talk To Our Marketing Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
