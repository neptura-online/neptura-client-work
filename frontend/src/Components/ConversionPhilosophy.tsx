import { motion } from "framer-motion";

import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";
import { pillars } from "../constant/constant";

export default function ConversionPhilosophy({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const triggerButton = () => {
    setOpenForm(true);
    setId("built pages that lead are magnet");
  };
  return (
    <section className="relative bg-zinc-950 py-10 md:py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Heading white="We don't create" yellow="pretty pages." />

          <p className="mt-6 text-base text-zinc-300">
            Our landing pages are engineered with one goal in mind —
            <span className="text-white font-medium uppercase">
              {" "}
              conversion!{" "}
            </span>
            Every page we design includes:
          </p>
        </motion.div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-white/10 bg-zinc-900 p-6 transition hover:border-yellow-400/40"
            >
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-yellow-400 text-black">
                  <item.icon className="text-sm" />
                </div>

                <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-8 max-w-3xl text-center"
        >
          <button
            onClick={triggerButton}
            className="md:mt-8 rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.03] text-sm"
          >
            Build Pages That Are Lead Magnets
          </button>
        </motion.div>
      </div>
    </section>
  );
}
