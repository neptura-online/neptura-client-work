import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";

export function AuthoritySection({ setOpenForm, setId }: OpenFormProps) {
  const triggerButton = () => {
    setOpenForm(true);
    setId("book a call ceo");
  };
  return (
    <section className="relative text-white overflow-hidden">
      <div className="relative z-10 lg:max-w-6xl mx-auto px-10 py-10 rounded-3xl overflow-hidden bg-stone-950">
        <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 mb-6 text-xs font-bold tracking-[0.30em] uppercase text-yellow-500">
              Founder • Strategist • CEO
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-medium leading-[1.5em] tracking-tight">
              Meet the Mind Behind
              <br />
              <span className="text-yellow-500">7X Growth Strategies</span>
            </h2>

            <p className="mt-6 text-md text-gray-300 max-w-xl leading-relaxed">
              <strong className="text-white">Abhishek Jain</strong> helps
              ambitious brands scale faster using performance marketing,
              conversion psychology, and automation-led growth frameworks.
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
                className="px-8 py-4 rounded-xl text-sm lg:text-md bg-yellow-500 text-black font-semibold uppercase tracking-widest hover:scale-105 transition shadow-[0_0_50px_rgba(255,204,0,0.35)]"
              >
                Book a 15-Minute Call With Our CEO
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
              <img
                src="/assets/photo.avif"
                alt="CEO Portrait"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 rounded-2xl bg-black/70 backdrop-blur-md px-6 py-4 border border-white/10">
                <p className="text-sm font-bold text-white">Abhishek Jain</p>
                <p className="text-xs text-yellow-500 uppercase tracking-widest">
                  CEO • Growth Strategist
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
