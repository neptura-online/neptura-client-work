import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import type { OpenFormProps } from "../types/type";

export default function IndustriesHeroSection({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const handleClick = () => {
    setOpenForm(true);
    setId("hero lets work together");
  };
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#1A1421] via-[#12051a] to-[#2a0f30] pt-10 lg:pt-20 text-white">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 opacity-70 -bottom-60"
        style={{
          backgroundImage: "url('/business/shape2.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
      <div className="mx-auto max-w-350 px-3 lg:px-6 ">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-[70%] pb-10 flex flex-col justify-center items-center sm:items-start"
          >
            <h2 className="font-serif text-4xl leading-tight md:text-5xl text-center lg:text-start">
              Helped Businesses Across{" "}
              <span className="font-semibold">127+</span>
              <br />
              Industries Scale Faster
            </h2>

            <div className="mt-6 h-0.5 w-24 bg-white" />

            <p className="mt-6 max-w-xl text-lg text-white/80 text-center sm:text-start">
              From startups to enterprises, we’ve helped businesses grow
              exponentially with logic-driven and sales-oriented digital
              marketing strategies.
            </p>

            <button
              onClick={handleClick}
              className="group mt-10 z-10 inline-flex items-center gap-2 rounded-xl border border-white/70 px-8 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              Let’s Grow Together
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center lg:justify-start items-end"
          >
            <div className="relative">
              <img
                src="/business/scale.webp"
                alt="Mobile marketing preview"
                className="relative z-10 w-80 md:w-[320px] lg:w-270"
              />

              <div className="absolute inset-0 -z-10 rounded-full bg-purple-500/30 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
