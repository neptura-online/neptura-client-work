import { motion } from "framer-motion";
import FormImg from "/assets/hero-screenshot-skew-min.png";
import WpImg from "/assets/Img.svg";
import type { OpenFormProps } from "../types/type";

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
    <section className=" text-white flex justify-center w-screen">
      <div className="container mx-auto md:max-w-6xl px-2 lg:px-0 py-20">
        <div className="flex relative flex-col items-center gap-12 rounded-3xl border border-stone-800 bg-stone-950 p-6 md:flex-row md:p-16 ">
          <div className="pointer-events-none absolute inset-0 z-50 bg-[url('assets/noise.svg')] opacity-10 rounded-3xl" />
          <motion.div {...fadeUp} className="w-full md:w-1/2 ">
            <span className="inline-block rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              Limited Time Offer
            </span>

            <h2 className="mt-6 font-serif text-3xl md:text-4xl font-medium leading-[1.5em]">
              Get Premium Tools Worth{" "}
              <span className="text-yellow-400">₹19,589 Absolutely FREE</span>
            </h2>

            <p className="mt-6 text-stone-400">
              When you build your landing page with us, you get industry-leading
              premium tools included at no extra cost.
            </p>

            <button
              onClick={triggerButton}
              className="mt-10 rounded-2xl bg-yellow-500 px-6 py-3 text-sm font-semibold text-black transition hover:scale-105 lg:text-md"
            >
              Register To Claim The Offer
            </button>
          </motion.div>

          <motion.div {...scaleFade} className="w-full space-y-6 md:w-1/2">
            <motion.div
              initial="rest"
              whileHover="hover"
              className="relative rounded-2xl border border-stone-800 bg-stone-900 p-6"
            >
              <h3 className="text-xl font-serif font-semibold">
                1 Year Gravity Forms <br className="sm:hidden" /> –{" "}
                <span className="text-yellow-400">FREE</span>
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
              className="relative rounded-2xl border border-stone-800 bg-stone-900 p-6"
            >
              <h3 className="text-xl font-serif font-semibold">
                1 Year WP Rocket <br className="sm:hidden" /> –{" "}
                <span className="text-yellow-400">FREE</span>
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
