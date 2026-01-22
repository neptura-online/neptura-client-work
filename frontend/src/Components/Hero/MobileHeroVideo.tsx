import { FaArrowUpLong } from "react-icons/fa6";
import type { OpenFormProps } from "../../types/type";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiPhone } from "react-icons/fi";
import { FaEnvelope } from "react-icons/fa";
import { useLeadForm } from "../../hooks/useLeadForm";

const MobileHeroVideo = ({ setOpenForm, setId }: OpenFormProps) => {
  const {
    formData,
    setFormData,
    formError,
    phone,
    phoneError,
    handlePhoneChange,
    handleChange,
    loading,
    error,
    handleSubmit,
  } = useLeadForm({
    formID: "mobile hero",
    mode: "simple",
  });

  const triggerButton = () => {
    setOpenForm(true);
    setId("Get Free Landing Page");
  };
  return (
    <div className=" relative flex w-screen justify-center overflow-hidden  bg-[#160a1f] text-white">
      <div className="w-full flex flex-col items-center gap-12 pb-10 ">
        <div className="relative px-4 md:px-12 pb-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            src="/videos/bg.mp4"
          />
          <div className="absolute inset-0 bg-linear-to-br from-zinc-800/80 via-zinc-900/80 to-yellow-600/40" />
          <div className="sm:hidden w-full max-w-390 mx-auto ">
            <div className="relative z-10 flex  items-center justify-between py-2 lg:px-16 ">
              <div className="flex items-center gap-2">
                <a href="/">
                  <img
                    src="/assets/logowhite.webp"
                    alt="Logo"
                    className="h-15 md:h-20 w-auto"
                    loading="lazy"
                  />
                </a>
              </div>

              <div className="items-center gap-4 flex ">
                <a
                  href="/"
                  className="hidden text-white md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base"
                >
                  <FaEnvelope />
                  Email ID@e-marketing.io
                </a>
                <a
                  href="/"
                  className="flex items-center gap-2 rounded-xl bg-(--yellow-emarketing) px-4 py-3 text-sm lg:text-base text-black"
                >
                  <FiPhone />
                  +91-9602694444
                </a>
              </div>
            </div>
          </div>
          <div className="relative flex w-full flex-col gap-6 z-10 sm:pt-30 ">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              className="font-serif  text-3xl font-extrabold leading-tight md:text-6xl"
            >
              <span className="bg-linear-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-[1.5em]">
                Spending Money On Ads And Still Losing Leads?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
              className="max-w-xl text-lg text-zinc-300 md:text-2xl"
            >
              Your Landing Page Might Not Be Built For Conversion! Don’t Worry!
              We will help you identify the mistakes.
            </motion.p>

            <motion.button
              onClick={triggerButton}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.8 }}
              className="group mt-4 flex w-fit  items-center gap-4 rounded-2xl bg-yellow-500 px-4 py-3 transition-all hover:scale-105 hover:bg-yellow-400  hover:cursor-pointer"
            >
              {" "}
              <span className="hidden lg:flex h-7 w-7 items-center justify-center rounded-full bg-black"></span>
              <span className="text-left text-sm font-semibold text-black md:text-xl">
                Get Free Landing Page
              </span>
              <span className="lg:hidden flex h-7 w-7 items-center justify-center rounded-full bg-black">
                <FaArrowUpLong className="rotate-45 text-sm text-yellow-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </motion.button>
          </div>
        </div>
        <div className="relative w-full flex md:w-1/2 justify-center px-2 md:p-0">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="
                  fixed z-70
                  top-4 sm:top-10 left-1/2 -translate-x-1/2
                  sm:left-1/2
                  w-[90%] sm:w-auto
                  max-w-sm
                  rounded-xl
                  bg-red-50
                  border border-red-200
                  px-4 py-3
                  shadow-lg
                "
              >
                <p className="text-sm sm:text-base font-medium text-red-600 text-center sm:text-left">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
            className="w-full max-w-md rounded-3xl bg-white p-7 text-black shadow-2xl"
          >
            <h3 className="text-2xl font-extrabold font-serif leading-[1.5em] text-center">
              Create <span className="text-yellow-500">Lead Capturing</span>
              <br />
              Landing Pages With Us!
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
              />
              {formError.name && (
                <p className="text-sm text-red-500 -mt-2">{formError.name}</p>
              )}

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email*"
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
              />
              {formError.email && (
                <p className="text-sm text-red-500 -mt-2">{formError.email}</p>
              )}

              <PhoneInput
                country="in"
                value={phone}
                onChange={(value, country) => handlePhoneChange(value, country)}
                countryCodeEditable={false}
                autoFormat={false}
                enableSearch
                inputStyle={{
                  width: "100%",
                  height: "52px",
                  borderRadius: "12px",
                }}
              />

              {phoneError && (
                <p className="text-sm text-red-500 -mt-2">{phoneError}</p>
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-yellow-500"
                placeholder="Message*"
                maxLength={50}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-2xl bg-black disabled:cursor-not-allowed disabled:bg-gray-600 py-3 text-base font-semibold text-white hover:text-black transition hover:bg-yellow-500"
              >
                Book A Free Consultation
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeroVideo;
