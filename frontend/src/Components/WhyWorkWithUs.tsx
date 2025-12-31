import { useState } from "react";
import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { ITEMS } from "../constant/constant";

export default function WhyWorkWithUs({ setId, setOpenForm }: OpenFormProps) {
  const [active, setActive] = useState(0);

  const triggerButton = () => {
    setOpenForm(true);
    setId("connect with us");
  };

  return (
    <section className="relative bg-stone-950 py-10 md:py-20 text-white">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-8 " />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-20 lg:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-medium leading-[1.5em] md:text-5xl">
              Why Your Business Should Work{" "}
              <span className="text-yellow-400">With Us?</span>
            </h2>

            <p className="mt-8 text-base text-stone-300">
              You don’t need another vendor.
              <br />
              You deserve a partner who understands your challenges and is
              committed to your success. Here's what sets us apart:
            </p>

            <p className="mt-6 text-stone-400">
              That’s how we work. Quietly. Precisely. Effectively.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-linear-to-t from-stone-950 to-transparent" />

            <div
              className="
                flex max-h-95 flex-col gap-5 overflow-y-auto pr-5 pl-5
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
                    className={`rounded-3xl p-4 backdrop-blur
                      ${
                        isActive
                          ? "bg-stone-900/80 shadow-2xl"
                          : "bg-stone-900/40"
                      }`}
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-yellow-400">
                      <item.icon className="text-lg" />
                    </div>

                    <h3 className="mb-2 text-base font-medium">{item.title}</h3>

                    <p className="max-w-md text-sm text-stone-400">
                      {item.desc}
                    </p>
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
              className="rounded-3xl bg-stone-900/60 p-7"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-stone-800 text-yellow-400">
                <item.icon />
              </div>

              <h3 className="mb-2 text-lg font-medium">{item.title}</h3>

              <p className="text-stone-400">{item.desc}</p>
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
