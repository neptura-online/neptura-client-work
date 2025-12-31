import { motion } from "framer-motion";
import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";
import { problems } from "../constant/constant";

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
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
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
          {problems.map(({ id, text, icon: Icon }) => (
            <div
              key={id}
              className="group flex flex-col gap-4 rounded-2xl border border-stone-800 bg-stone-900 p-6 font-bold text-stone-300 transition hover:border-yellow-600 hover:bg-yellow-500 hover:text-black"
            >
              <Icon className="text-3xl text-yellow-500 transition group-hover:text-black" />
              <p className="text-base md:text-lg">{text}</p>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-lg text-stone-300 md:text-xl">
            But here’s the good news. We can fix that.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={triggerButton}
            className="rounded-2xl bg-yellow-500 px-10 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:bg-yellow-400 lg:text-lg"
          >
            Talk To Our Marketing Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
