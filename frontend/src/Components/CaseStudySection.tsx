import { motion } from "framer-motion";
import { caseStudies } from "../constant/constant";
import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";

const CaseStudyCard = ({ data }: any) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: {
          y: 0,
          scale: 1,
        },
        hover: {
          y: -6,
          scale: 1.02,
        },
      }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 18,
        mass: 0.6,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-stone-900 p-6"
    >
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 bg-stone-950 group-hover:scale-102"
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-serif text-white">
            {data.title}
          </h3>

          <motion.p
            variants={{
              rest: { opacity: 0.6 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-sm leading-relaxed text-stone-200"
          >
            {data.description}
          </motion.p>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <motion.div
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.15 },
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-4xl font-black text-yellow-500 origin-left"
          >
            {data.metric}
          </motion.div>

          <span className="text-xs font-medium uppercase tracking-widest text-stone-500 bg-stone-700 px-2 py-2 rounded-sm group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:font-black">
            {data.metricLabel}
          </span>
        </div>
      </div>

      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -inset-10 bg-yellow-500/10 blur-3xl" />
      </motion.div>
    </motion.div>
  );
};

export default function CaseStudiesSection({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const triggerButton = () => {
    setOpenForm(true);
    setId("case study");
  };
  return (
    <section className="relative bg-linear-to-b from-stone-950 via-stone-900 to-black py-10 ;lg:py-20">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      <div className="mb-8 lg:mb-12 text-center">
        <Heading white="Real Case Studies," yellow="Real ROAS" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item, i) => (
            <CaseStudyCard key={i} data={item} />
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-20 flex justify-center">
        <button
          onClick={triggerButton}
          className="rounded-2xl bg-yellow-500 px-6 py-2 text-sm font-semibold uppercase tracking-widest text-black transition"
        >
          Book Your Free Audit
        </button>
      </div>
    </section>
  );
}
