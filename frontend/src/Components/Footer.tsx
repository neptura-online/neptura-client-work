import { FiMail, FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import { motion, AnimatePresence } from "framer-motion";

import "react-phone-input-2/lib/style.css";
import { useLeadForm } from "../hooks/useLeadForm";

const Footer = () => {
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
    mode: "business",
  });

  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-black/10 bg-[#160a1f] pt-10 lg:pt-24 pb-10"
    >
      <div className="relative mx-auto max-w-350 px-6">
        <div className="mb-20 grid gap-16 lg:grid-cols-2">
          <div className="text-left">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.4em] text-(--yellow-emarketing)">
              Let’s Talk
            </span>

            <h2 className="mb-6 text-3xl  md:text-5xl font-medium uppercase tracking-tight text-white leading-[1.5em] font-serif">
              Let's work together.
              <br />
              <span className="bg-linear-to-r from-yellow-300 to-(--yellow-emarketing) bg-clip-text text-transparent">
                Fix A Meeting Today!
              </span>
            </h2>

            <div className="flex flex-col gap-4 mt-4 justify-start items-start">
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <LuMapPin size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  8/10, Shaheed Amit Bhardwaj Marg, Sector 8, Malviya Nagar,{" "}
                  <br />
                  Jaipur - 302017 (Raj)
                </a>
              </div>
              <div className=" flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <FiMail size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  cagarwal389@gmail.com
                </a>
              </div>
              <div className=" flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <FiPhoneCall size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  +91-8239999732
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white text-black p-4 sm:p-10 backdrop-blur">
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-6 flex flex-col gap-4"
            >
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name*"
                    className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing) w-full"
                  />
                  {formError.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {formError.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email*"
                    className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing) w-full"
                  />
                  {formError.email && (
                    <p className="text-sm mt-1 text-red-500">
                      {formError.email}
                    </p>
                  )}
                </div>
              </div>

              <PhoneInput
                country="in"
                value={phone}
                onChange={handlePhoneChange}
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

              <input
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry*"
                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing)"
              />
              {formError.industry && (
                <p className="text-sm text-red-500 -mt-2">
                  {formError.industry}
                </p>
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-(--yellow-emarketing)"
                placeholder="Message"
                maxLength={50}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-xl bg-black disabled:cursor-not-allowed disabled:bg-gray-600 py-4 text-lg font-semibold text-white hover:text-black transition hover:bg-(--yellow-emarketing) hover:cursor-pointer"
              >
                Book A Free Consultation
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/90 pt-6 md:flex-row">
          <p className="text-xs text-white/90">
            Copyright © {new Date().getFullYear()} | Powered by JAI MARKETING.
          </p>
          <div className="flex gap-6 text-xs text-white/90">
            <a
              href="https://www.e-marketing.io/privacy-policy/"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.e-marketing.io/disclaimer/"
              className="transition hover:text-white"
            >
              Disclaimer
            </a>
            <a
              href="https://www.e-marketing.io/terms-of-use/"
              className="transition hover:text-white"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
