import { motion } from "framer-motion";

import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";
import { pillars } from "../constant/constant";
import WorkIcon from "../ComponentsBusiness/Helper/WorkIcon";
import { FiArrowRight } from "react-icons/fi";

export default function ConversionPhilosophy({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const triggerButton = () => {
    setOpenForm(true);
    setId("built pages that lead are magnet");
  };
  return (
    <section className="relative bg-[#160a1f] py-10 md:py-20 text-white">
      <div className="mx-auto max-w-340 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Heading white="We don't create" yellow="pretty pages." />

          <p className="mt-6 text-base text-zinc-300">
            Our Landing Pages are built with one goal in mind:
            <span className="text-white font-medium uppercase">
              {" "}
              conversion!{" "}
            </span>
            Every page we design includes:
          </p>
        </motion.div>

        <div className="mt-8  grid gap-6 items-start sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, i) => (
            <div
              key={item.title}
              className="sticky sm:static h-full"
              style={{ top: `${70 + i * 15}px`, zIndex: i }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-black/10 bg-zinc-100 p-6 shadow-xl transition hover:border-yellow-400/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex min-h-12 min-w-12 items-center justify-center rounded-xl bg-(--yellow-emarketing)">
                    <WorkIcon url={item.url} alt={item.title} />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-950">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text- text-stone-300 ">
            We combine design psychology + persuasive copywriting + performance
            marketing to build pages that convert like crazy.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <button
            onClick={triggerButton}
            className="mt-8 mx-auto rounded-2xl bg-(--yellow-emarketing) px-6 py-3 font-semibold text-black transition hover:scale-[1.03] text-sm cursor-pointer flex items-center gap-2 "
          >
            Build Pages That Are Lead Magnets
            <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
