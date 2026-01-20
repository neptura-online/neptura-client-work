import { motion } from "framer-motion";
import FormImg from "/assets/hero.webp";
import WpImg from "/assets/Img.svg";
import type { OpenFormProps } from "../types/type";
import { FiArrowRight } from "react-icons/fi";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const scaleFade = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay: 0.1 },
  viewport: { once: true },
};

const hoverPreview = {
  rest: { opacity: 0, y: 20, scale: 0.95 },
  hover: { opacity: 1, y: 0, scale: 1 },
};

const OfferContainer = ({ setOpenForm, setId }: OpenFormProps) => {
  const triggerButton = () => {
    setOpenForm(true);
    setId("claim offer");
  };
  return (
    <section className=" text-white relative flex justify-center max-w-screen bg-[#160a1f]">
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container mx-auto w-full md:max-w-340 px-4 py-20">
        <div className="flex relative flex-col items-center gap-12 rounded-3xl  md:flex-row  ">
          <motion.div {...fadeUp} className="w-full md:w-1/2 ">
            <span className="inline-block rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-(--yellow-emarketing)">
              Limited Time Offer
            </span>

            <h2 className="mt-6 font-serif text-3xl md:text-4xl font-medium leading-[1.5em]">
              Get Premium Tools Worth{" "}
              <span className="text-(--yellow-emarketing)">
                ₹19,589 Absolutely FREE
              </span>
            </h2>

            <p className="mt-6 text-stone-400">
              When you build your landing page with us, you get industry-leading
              premium tools included at no extra cost.
            </p>

            <button
              onClick={triggerButton}
              className="mt-10 rounded-2xl bg-(--yellow-emarketing) px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 lg:text-md hover:cursor-pointer flex items-center gap-2"
            >
              Register To Claim The Offer
              <FiArrowRight />
            </button>
          </motion.div>

          <motion.div {...scaleFade} className="w-full space-y-6 md:w-1/2">
            <motion.div
              initial="rest"
              whileHover="hover"
              className="relative rounded-2xl border border-(--yellow-emarketing) p-6"
            >
              <h3 className="text-xl font-serif font-semibold">
                1 Year Gravity Forms <br className="sm:hidden" /> –{" "}
                <span className="text-(--yellow-emarketing)">FREE</span>
              </h3>

              <p className="mt-2 text-sm md:text-md text-stone-400">
                Build advanced enquiry forms with conditional logic, spam
                protection, lead tracking, and CRM-ready submissions.
              </p>

              <p className="mt-2 text-sm font-bold text-stone-100">
                Worth ₹14,288
              </p>

              <motion.div
                variants={hoverPreview}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="pointer-events-none absolute right-1 hidden md:block"
                style={{ top: "-3.75rem" }}
              >
                <img
                  src={FormImg}
                  alt="Gravity Forms"
                  loading="lazy"
                  decoding="async"
                  className="h-30 will-change-transform"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial="rest"
              whileHover="hover"
              className="relative rounded-2xl border border-(--yellow-emarketing) p-6"
            >
              <h3 className="text-xl font-serif font-semibold">
                1 Year WP Rocket <br className="sm:hidden" /> –{" "}
                <span className="text-(--yellow-emarketing)">FREE</span>
              </h3>

              <p className="mt-2 text-sm md:text-md text-stone-400">
                Ensure lightning-fast landing page speed, improved Core Web
                Vitals, and higher conversions with premium caching and
                performance optimization.
              </p>

              <p className="mt-2 text-sm font-bold text-stone-100">
                Worth ₹5,301
              </p>

              <motion.div
                variants={hoverPreview}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                className="pointer-events-none absolute right-1 hidden md:block"
                style={{ top: "-5rem" }}
              >
                <img
                  src={WpImg}
                  alt="WP Rocket"
                  loading="lazy"
                  decoding="async"
                  className="h-35 will-change-transform"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferContainer;
