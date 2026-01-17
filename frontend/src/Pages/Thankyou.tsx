import { motion } from "framer-motion";
import { FaChevronLeft, FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import FAQSection from "../Components/FAQQuestion";

const Thankyou = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, []);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white flex justify-center">
        <div className="absolute inset-0 bg-black" />

        <img
          src="/assets/pattern-bg.webp"
          alt="pattern1"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <img
          src="/assets/bg-shape.webp"
          alt="pattern2"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="relative z-10 max-w-390 w-full">
          <div className="flex items-center justify-between px-3 py-2 lg:px-16">
            <a href="/">
              <img
                src="/assets/logowhite.webp"
                alt="Logo"
                width={160}
                height={64}
                className="h-15 md:h-20 w-auto"
                loading="lazy"
                decoding="async"
              />
            </a>

            <div className="flex items-center gap-4">
              <a className="hidden md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base">
                <FaEnvelope />
                Email ID@e-marketing.io
              </a>
              <a className="flex items-center gap-2 rounded-xl bg-(--yellow-emarketing) px-4 py-3 text-sm lg:text-base text-black">
                <FiPhone />
                +91-9602694444
              </a>
            </div>
          </div>

          <div className="mx-auto md:mx-4 flex flex-col lg:flex-row gap-12 justify-between lg:px-16">
            <div className="flex flex-col items-start lg:w-[90%] px-5 py-10">
              {name && (
                <h1 className="text-[30px] mb-3 font-serif md:text-[45px]">
                  Hi,{" "}
                  <span className="text-(--yellow-emarketing) capitalize">
                    {name}
                  </span>
                </h1>
              )}

              <h1 className="text-[30px] font-serif md:text-[45px]">
                Thank You For Sending Your Enquiry.
              </h1>

              <div className="mt-8 h-0.5 w-16 bg-white" />

              <p className="mt-8 text-xl md:text-3xl">
                Our Team Will Get In Touch With You.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-4">
                {["meta", "google", "whatsapp"].map((img) => (
                  <img
                    key={img}
                    src={`/business/${img}.webp`}
                    alt={img}
                    loading="lazy"
                    decoding="async"
                    className="h-8 lg:h-16  rounded-sm"
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(-1)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm transition hover:bg-white hover:text-black"
              >
                <FaChevronLeft />
                Back To Home
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-end items-end"
            >
              <img
                src="/business/scale.webp"
                alt="Preview"
                width={420}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full lg:w-280"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Suspense
        fallback={<section className="bg-zinc-100 min-h-130 py-10 lg:py-20" />}
      >
        <FAQSection />
      </Suspense>

      <footer className="bg-[#1A1421] py-4 flex justify-center w-screen">
        <div className="w-full max-w-350 flex flex-col-reverse xl:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-white/90">
            Copyright © {new Date().getFullYear()} | Powered by JAI MARKETING.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm text-white/90">
            <a href="https://www.e-marketing.io/privacy-policy/">
              Privacy Policy
            </a>
            <a href="https://www.e-marketing.io/disclaimer/">Disclaimer</a>
            <a href="https://www.e-marketing.io/terms-of-use/">Terms of Use</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Thankyou;
