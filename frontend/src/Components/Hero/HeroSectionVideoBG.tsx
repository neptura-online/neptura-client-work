import { FaArrowUpLong } from "react-icons/fa6";
import type { OpenFormProps } from "../../types/type";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import video from "/videos/bg.mp4";
import { useLeadForm } from "../../hooks/useLeadForm";

const HeroSectionVideoBG = ({ setOpenForm, setId }: OpenFormProps) => {
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
    formID: "hero",
    mode: "simple",
  });

  const triggerButton = () => {
    setOpenForm(true);
    setId("get free landing page audit");
  };

  return (
    <div className=" relative w-full justify-center overflow-hidden pt-30 pb-10 bg-zinc-950 text-white">
      <div className="absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-yellow-600/90" />
      <img
        src="/business/banner.webp"
        alt="Business marketing banner"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      <video
        src={video}
        className="absolute inset-0 h-full w-full object-fill"
        muted
        autoPlay
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-linear-to-br from-zinc-800/70 via-zinc-900/60 to-yellow-600/40" />

      <div className="container mx-auto py-auto flex max-w-370 flex-row items-start gap-12 py-2 lg:px-16 ">
        <div className="flex flex-col gap-6 w-1/2 z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeIn", duration: 0.5 }}
            className="font-serif text-3xl font-semibold  md:text-5xl"
          >
            <span className="bg-linear-to-r from-yellow-400 to-(--yellow-emarketing) bg-clip-text text-transparent leading-[1.5em]">
              Spending Money On Ads And Still Losing Leads?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="max-w-xl text-sm text-zinc-300 md:text-lg"
          >
            Your Landing Page Might Not Be Built For Conversion! Don’t Worry! We
            will help you identify the mistakes.
          </motion.p>

          <motion.button
            onClick={triggerButton}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.8 }}
            className="group mt-4 flex w-fit  items-center gap-4 rounded-2xl bg-(--yellow-emarketing) px-6 py-3 transition-all hover:scale-105   hover:cursor-pointer"
          >
            {" "}
            <span className="hidden lg:flex h-7 w-7 items-center justify-center rounded-full bg-black">
              <FaArrowUpLong className="rotate-45 text-md text-(--yellow-emarketing) transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
            <span className="text-left font-medium text-black text-md">
              Get Free Landing Page Audit
            </span>
          </motion.button>
        </div>
        <div className="relative w-full flex md:w-1/2  justify-end">
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
            className="w-full max-w-105 rounded-3xl bg-white p-6 pb-12 text-black shadow-2xl text-center"
          >
            <h3 className="text-2xl font-extrabold font-serif leading-[1.5em]">
              Create <span className="text-yellow-500">Lead Capturing</span>{" "}
              <br />
              Landing Pages With Us!
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-6 flex flex-col gap-3"
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
                <p className="text-sm text-start text-red-500 -mt-2">
                  {formError.name}
                </p>
              )}

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
              />
              {formError.email && (
                <p className="text-sm text-start text-red-500 -mt-2">
                  {formError.email}
                </p>
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
                <p className="text-sm  text-red-500 -mt-2 text-start">
                  {phoneError}
                </p>
              )}

              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-yellow-500"
                placeholder="Message"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-2xl hover:bg-black py-3 text-base font-semibold hover:text-white transition bg-(--yellow-emarketing) text-black disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
              >
                {loading ? "Loading..." : "Book A Free Consultation"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionVideoBG;
