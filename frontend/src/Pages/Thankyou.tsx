import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaEnvelope, FaMinus, FaPlus } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { faqs } from "../constant/constant";

const Thankyou = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("name");
    console.log(name);
    if (name) {
      setName(name);
    }
  }, []);
  return (
    <div className="bg-zinc-100">
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white flex justify-center">
        <div className="absolute inset-0 bg-black" />

        <img
          src="/assets/pattern-bg.webp"
          alt=""
          fetchPriority="high"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/assets/bg-shape.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="max-w-390">
          {/* right part */}
          <div className="relative z-10 flex  items-center justify-between px-3 py-2 lg:px-16">
            <div className="flex items-center gap-2">
              <img
                src="/assets/logowhite.webp"
                alt="Logo"
                className="h-15 md:h-20 w-auto"
                loading="lazy"
              />
            </div>

            <div className="items-center gap-4 flex">
              <a
                href="#"
                className="hidden md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base"
              >
                <FaEnvelope />
                Email ID@e-marketing.io
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-xl bg-(--yellow-emarketing) px-4 py-3 text-sm lg:text-base text-black"
              >
                <FiPhone />
                +91-9602694444
              </a>
            </div>
          </div>

          <div className="relative z-10 mx-auto md:mx-4 flex gap-12 flex-col lg:flex-row justify-between lg:px-16 ">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col justify-start items-start lg:w-[90%] px-5 py-10"
            >
              {name && (
                <h1 className="text-[30px] mb-3 font-serif font-medium leading-tight md:text-[45px] ">
                  Hi,{" "}
                  <span className="text-(--yellow-emarketing) capitalize">
                    {name}
                  </span>
                </h1>
              )}
              <h1 className="text-[30px] font-serif font-medium leading-tight md:text-[45px] ">
                Thank You For Sending Your Enquiry.
              </h1>

              <div className="mt-8 h-0.5 w-16 bg-white" />

              <p className="mt-8 text-xl  md:text-3xl text-white">
                Our Team Will Get In Touch With You.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-4">
                <img
                  src="/business/meta.webp"
                  alt="Meta"
                  loading="lazy"
                  decoding="async"
                  className="h-8 lg:h-16 aspect-3/1 rounded-sm"
                />
                <img
                  src="/business/google.webp"
                  alt="Google"
                  loading="lazy"
                  decoding="async"
                  className="h-8 lg:h-16 aspect-3/1 rounded-sm"
                />

                <img
                  src="/business/whatsapp.webp"
                  alt="WhatsApp"
                  loading="lazy"
                  decoding="async"
                  className="h-8 lg:h-16 aspect-3/1 rounded-sm"
                />
              </div>

              <button
                onClick={() => navigate(-1)}
                className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm transition hover:bg-white hover:text-black hover:cursor-pointer"
              >
                <FaChevronLeft />
                Back To Home
              </button>
            </motion.div>
            {/* second part */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-end items-end"
            >
              <div className="relative">
                <img
                  src="/business/scale.webp"
                  loading="lazy"
                  alt="Mobile marketing preview"
                  className="relative z-10 w-full lg:w-280 bottom-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-100 py-10 lg:py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-black leading-[1.2em] capitalize"
          >
            Frequently Asked{" "}
            <span className="text-(--yellow-emarketing)">Questions</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-(--yellow-emarketing)"
          />

          <div className="mt-14 space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-[#160a1f]"
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
                      <FaMinus className="text-(--yellow-emarketing) text-sm md:text-lg hover:cursor-pointer" />
                    ) : (
                      <FaPlus className="text-(--yellow-emarketing) text-sm md:text-lg hover:cursor-pointer" />
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
                      className="border-t border-zinc-800 px-5 py-4 text-xs lg:text-base leading-relaxed text-start whitespace-pre-line text-zinc-300"
                    >
                      {" "}
                      {item.n}
                      <span className="text-zinc-100 font-semibold">
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

      <section>
        <div className=" bg-[#1A1421] py-4 flex justify-center w-screen ">
          <div className="w-full max-w-350 flex flex-col items-center justify-between gap-4 xl:flex-row">
            <p className="text-xs sm:text-sm text-white/90">
              Copyright © {new Date().getFullYear()} | Powered by JAI MARKETING.
            </p>
            <div className="flex gap-6 text-xs sm:text-sm text-white/90">
              <a
                href="https://www.e-marketing.io/privacy-policy/"
                className="transition hover:text-yellow-emarketing"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.e-marketing.io/disclaimer/"
                className="transition hover:text-yellow-emarketing"
              >
                Disclaimer
              </a>
              <a
                href="https://www.e-marketing.io/terms-of-use/"
                className="transition hover:text-yellow-emarketing"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Thankyou;
