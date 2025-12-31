import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { faqs } from "../constant/constant";
import Heading from "./Helper/Heading";

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-stone-950 py-10 lg:py-20 text-white">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <Heading white="Frequently Asked" yellow="Questions" />

        <div className="mt-14 space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900"
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
                    <FaMinus className="text-yellow-500 text-sm md:text-lg" />
                  ) : (
                    <FaPlus className="text-yellow-500 text-sm md:text-lg" />
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
                    className="border-t border-stone-800 px-5 py-4 text-xs lg:text-base leading-relaxed text-start whitespace-pre-line text-stone-300"
                  >
                    {" "}
                    {item.n}
                    <span className="text-stone-100 font-semibold">
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
