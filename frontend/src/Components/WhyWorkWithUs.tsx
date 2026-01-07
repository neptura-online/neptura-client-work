import { useState } from "react";
import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { ITEMS } from "../constant/constant";
import WorkIcon from "./Helper/WorkIcon";

export default function WhyWorkWithUs({ setId, setOpenForm }: OpenFormProps) {
  const [active, setActive] = useState(0);

  const triggerButton = () => {
    setOpenForm(true);
    setId("connect with us");
  };

  return (
    <section className="relative bg-stone-950 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('assets/noise.svg')] opacity-8 " />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-medium leading-[1.5em] md:text-6xl text-center sm:text-start">
              Why Work <br className="hidden sm:block" />{" "}
              <span className="text-yellow-400">With Us?</span>
            </h2>

            <p className="mt-8 text-lg text-stone-300">
              You deserve a partner who understands your challenges and is
              committed to your success.
            </p>

            <p className="mt-6 text-stone-400">Here's what sets us apart:</p>
          </div>

          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-linear-to-t from-stone-950 to-transparent" />

            <div
              className="
                flex max-h-70 flex-col gap-5 overflow-y-auto pr-5 pl-5
                scrollbar-hide
              "
            >
              {ITEMS.map((item, index) => {
                const isActive = index === active;

                return (
                  <motion.div
                    key={item.title}
                    onMouseEnter={() => setActive(index)}
                    animate={{
                      opacity: isActive ? 1 : 0.65,
                      scale: isActive ? 1.02 : 0.98,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`rounded-3xl p-4 backdrop-blur flex items-center gap-4
                      ${
                        isActive
                          ? "bg-stone-900/80 shadow-2xl"
                          : "bg-stone-900/40"
                      }`}
                  >
                    <div className=" flex h-12 w-12 items-center justify-center rounded-xl bg-stone-800 text-yellow-400">
                      <WorkIcon url={item.url} alt={item.title} />
                    </div>

                    <h2 className=" text-xl font-medium">{item.title}</h2>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-6 lg:hidden">
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-stone-900/60 p-4 flex gap-4 items-center"
            >
              <div className=" flex h-12 w-12 items-center justify-center rounded-xl bg-stone-800 text-yellow-400">
                <WorkIcon url={item.url} alt={item.title} />
              </div>

              <h3 className="mb-2 text-lg font-medium">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="mb-4 text-base text-stone-300">
            If you’re serious about growth, we should talk.
          </p>

          <button
            onClick={triggerButton}
            className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.05]"
          >
            Connect With Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
