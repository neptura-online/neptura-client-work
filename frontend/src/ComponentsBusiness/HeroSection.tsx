import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { useTypewriter } from "../hooks/useTypewriter";
import type { OpenFormProps } from "../types/type";

const HeroSection = ({ setOpenForm, setId }: OpenFormProps) => {
  const handleClick = () => {
    setOpenForm(true);
    setId("hero lets work together");
  };
  const typedText = useTypewriter();
  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 text-white flex justify-center">
      <div className="absolute inset-0 bg-linear-to-br lg:bg-linear-to-r from-zinc-800 via-zinc-900 to-yellow-600/90" />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-390">
        <div className="relative z-10 flex  items-center justify-between px-3 py-2 lg:px-16">
          <div className="flex items-center gap-2">
            <img
              src="/assets/logowhite.webp"
              alt="Logo"
              className="h-15 md:h-20 w-auto"
            />
          </div>

          <div className="items-center gap-4 flex">
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base">
              <FaEnvelope />
              Email ID@e-marketing.io
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-yellow-emarketing px-4 py-3 text-sm lg:text-base text-black">
              <FiPhone />
              +91-9602694444
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto md:mx-4 flex gap-12 py-6 flex-col md:flex-row justify-between lg:px-16 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-start lg:w-[80%] px-6"
          >
            <h1 className="text-4xl font-serif font-medium leading-tight md:text-[50px] ">
              Get More Leads. Close More Sales.
            </h1>

            <div className="mt-8 h-0.5 w-16 bg-white" />

            <h2 className="mt-8 text-2xl font-serif font-semibold md:text-[42px]">
              Grow Your{" "}
              <span className="text-yellow-emarketing ">{typedText}</span>
            </h2>

            <p className="my-8 text-xl  md:text-2xl text-zinc-300">
              We have helped clients generate{" "}
              <span className="font-semibold text-white">₹25+ Crores</span> in
              revenue!
            </p>

            <div className="mt-6 inline-flex items-start md:items-center gap-2 rounded-xl bg-white px-5 py-2 text-xl font-medium text-black w-fit">
              <span className="min-h-2 min-w-2 rounded-full bg-black mt-2 md:mt-0" />
              <span>
                Get Guaranteed <strong>15% ROAS</strong> Improvement with us.
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-4">
              <img
                src="/business/meta.png"
                alt="Meta"
                className="h-8 lg:h-16 rounded-sm"
              />
              <img
                src="/business/google.png"
                alt="Google"
                className="h-8 lg:h-16 rounded-sm"
              />
              <img
                src="/business/whatsapp.png"
                alt="WhatsApp"
                className="h-8 lg:h-16 rounded-sm"
              />
            </div>

            <button
              onClick={handleClick}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              Let’s Grow Together
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center lg:justify-end px-2"
          >
            <div className="w-full lg:max-w-md rounded-3xl bg-white p-6 text-black shadow-2xl">
              <h3 className="text-2xl lg:text-3xl font-bold leading-9 font-serif">
                Let’s Get Started With a{" "}
                <span className="font-extrabold">FREE</span> Business Audit
                Worth <span className="font-extrabold">15,000</span> Today!
              </h3>

              <form className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Name*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                <input
                  type="text"
                  placeholder="Industry*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-black py-3 text-lg font-semibold text-white transition hover:bg-zinc-900"
                >
                  Get Your FREE Audit
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
