import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { FiArrowRight } from "react-icons/fi";

export default function AuthoritySection({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const triggerButton = () => {
    setOpenForm(true);
    setId("book a call ceo");
  };
  return (
    <section className="relative text-white overflow-hidden bg-zinc-100 pb-20">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 lg:max-w-340 mx-auto p-6 sm:p-10 rounded-3xl overflow-hidden bg-[#160a1f]">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 mb-6 text-xs font-bold tracking-[0.30em] uppercase text-(--yellow-emarketing)">
              Founder • Strategist • CEO
            </span>

            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-[1.5em] tracking-tight">
              Meet the Mind Behind
              <br />
              <span className="text-(--yellow-emarketing)">
                7X Growth Strategies
              </span>
            </h2>

            <p className="mt-6 text-md text-gray-300 max-w-xl leading-relaxed">
              <strong className="text-white">Abhishek Jain</strong> is a leader
              in digital marketing strategy and sales growth. For 10+ years
              Abhishek has helped businesses across India scale their revenue,
              dominate their niche, and multiply profits up to 7X through a
              proven mix of performance marketing, sales funnels, and automation
              frameworks.
              <br />
              If you want to understand what actually drives conversions, and
              how fast-growing companies scale using data-backed systems. .
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                10+ Years Experience
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Proven 7X Revenue Growth
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Data-Driven Systems
              </div>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <button
                onClick={triggerButton}
                className="px-6 py-3 rounded-2xl text-sm font-semibold bg-(--yellow-emarketing) text-black flex items-center gap-2 hover:cursor-pointer"
              >
                Book a 15-Minute Call With Our CEO
                <FiArrowRight />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl md:rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
              <img
                src="/assets/ceo.webp"
                alt="CEO Portrait"
                className="w-full h-full object-cover brightness-95"
              />

              <div className="absolute bottom-2  right-2 w-fit md:bottom-6 md:left-6 rounded-lg md:rounded-2xl bg-[#160a1f]/70 backdrop-blur-md px-3 md:px-6 py-2 md:py-4 border border-white/10">
                <p className="text-sm font-bold text-white">Abhishek Jain</p>
                <p className="text-xs text-(--yellow-emarketing) uppercase tracking-widest">
                  Founder & CEO
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
