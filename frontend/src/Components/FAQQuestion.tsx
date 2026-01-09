import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { faqs } from "../constant/constant";

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-zinc-100 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-[40px] font-medium text-black leading-[1.2em] capitalize"
        >
          Frequently Asked{" "}
          <span className="text-(--yellow-emarketing)">Questions</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-(--yellow-emarketing)"
        />

        <div className="mt-14 space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-[#160a1f]"
            >
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm leading-snug font-medium text-white md:text-lg">
                  {item.q}
                </span>

                <span className="shrink-0">
                  {active === index ? (
                    <FaMinus className="text-(--yellow-emarketing) text-sm md:text-lg" />
                  ) : (
                    <FaPlus className="text-(--yellow-emarketing) text-sm md:text-lg" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {active === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="border-t border-zinc-800 px-5 py-4 text-xs lg:text-base leading-relaxed text-start whitespace-pre-line text-zinc-300"
                  >
                    {" "}
                    {item.n}
                    <span className="text-zinc-100 font-semibold">
                      {item.h}
                    </span>
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
