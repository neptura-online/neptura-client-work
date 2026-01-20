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
        className="absolute inset-0 opacity-70 bottom-0"
        style={{
          backgroundImage: "url('/business/shape2.webp')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
      <div className="mx-auto max-w-350 px-3 lg:px-6 ">
        <div className="flex flex-col xl:flex-row gap-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full xl:w-[70%] flex pb-10 flex-col justify-center items-center xl:items-start"
          >
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage: "url('/business/shape2.webp')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            />
            <h2 className="font-serif text-4xl leading-tight md:text-[45px] w-full text-center xl:text-start">
              Helped Businesses Across{" "}
              <span className="font-semibold">127+</span>
              <br />
              Industries Scale Faster
            </h2>

            <div className="mt-6 h-0.5 w-24 bg-white" />

            <p className="mt-6 max-w-xl text-lg text-white/80 text-center xl:text-start">
              From startups to enterprises, we’ve helped businesses grow
              exponentially with logic-driven and sales-oriented digital
              marketing strategies.
            </p>

            <button
              onClick={handleClick}
              className="group mt-10 z-10 inline-flex items-center gap-2 rounded-xl border border-white/70 px-8 py-3 text-sm transition hover:bg-white hover:text-black hover:cursor-pointer "
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
            className="relative flex justify-center items-end"
          >
            <img
              src="/business/scale.webp"
              alt="Mobile marketing preview"
              className="relative z-10 w-full max-w-150 xl:max-w-full bottom-0"
            />

            <div className="absolute inset-0 -z-10 rounded-full bg-purple-500/30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
