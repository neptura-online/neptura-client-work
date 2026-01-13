import { motion } from "framer-motion";
import { FaChevronLeft, FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import FAQSection from "../Components/FAQQuestion";
import { useNavigate } from "react-router-dom";
const Thankyou = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white flex justify-center">
        <div className="absolute inset-0 bg-black" />

        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/assets/pattern-bg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
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
              className="flex flex-col justify-start items-start lg:w-[90%] px-6 py-10"
            >
              <h1 className="text-[35px] font-serif font-medium leading-tight md:text-[45px] ">
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
                  className="h-8 lg:h-16 rounded-sm"
                />
                <img
                  src="/business/google.webp"
                  alt="Google"
                  className="h-8 lg:h-16 rounded-sm"
                />
                <img
                  src="/business/whatsapp.webp"
                  alt="WhatsApp"
                  className="h-8 lg:h-16 rounded-sm"
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
                  alt="Mobile marketing preview"
                  className="relative z-10 w-full lg:w-280 bottom-0"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <FAQSection />
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
    </>
  );
};

export default Thankyou;
