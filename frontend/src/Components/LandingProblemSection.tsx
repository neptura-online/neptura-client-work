import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { landingProblems } from "../constant/constant";
import WorkIcon from "./Helper/PreetyIcon";
import { FiArrowRight } from "react-icons/fi";

const LandingProblemSection = ({ setOpenForm, setId }: OpenFormProps) => {
  const triggerButton = () => {
    setOpenForm(true);
    setId("start with free audit");
  };

  return (
    <section className="relative bg-[#160a1f] px-2 py-10 lg:py-24 overflow-hidden">
      <div className="mx-auto relative max-w-340 p-4">
        <div className="grid xl:grid-cols-2 items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start "
          >
            <img
              src="/assets/one.webp"
              alt=""
              className="hidden xl:block min-w-125 max-h-130 rounded-xl"
            />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8 mt-8 lg:mt-0"
          >
            <div className="space-y-4 text-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white leading-[1.5em] capitalize">
                A poorly designed Landing Page can{" "}
                <span className="text-(--yellow-emarketing)">
                  kill your revenue!{" "}
                </span>
                But how?
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {landingProblems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="rounded-xl border-black/10 bg-zinc-100 p-4 backdrop-blur border hover:border-yellow-500"
                >
                  <div className="flex items-center gap-3 ">
                    <div className=" flex min-h-12 min-w-12 items-center justify-center rounded-xl  bg-(--yellow-emarketing)">
                      <WorkIcon url={item.url} alt={item.text} />
                    </div>
                    <p className="text-sm text-zinc-900">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-base font-semibold text-white">
              But here’s the good news —{" "}
              <span className="text-(--yellow-emarketing)">
                we can fix that.
              </span>
            </p>

            <motion.button
              onClick={triggerButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-fit rounded-2xl bg-(--yellow-emarketing) px-6 py-3 font-semibold text-sm text-black items-center gap-2 hover:cursor-pointer"
            >
              Start With Free Audit
              <FiArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingProblemSection;
