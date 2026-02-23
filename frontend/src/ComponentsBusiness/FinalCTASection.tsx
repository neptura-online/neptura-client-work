import { motion, AnimatePresence } from "framer-motion";

import PhoneInput from "react-phone-input-2";
import { useLeadForm } from "../hooks/useLeadForm";

export default function FinalCTASection() {
  const {
    formData,
    formError,
    phone,
    phoneError,
    handlePhoneChange,
    handleChange,
    loading,
    error,
    handleSubmit,
  } = useLeadForm({
    formID: "footer",
    mode: "business",
  });
  return (
    <section className="bg-zinc-100 pt-10 lg:pt-20">
      <div className="mx-auto max-w-350 px-3 lg:px-6 pb-10">
        <div className="flex justify-between flex-col xl:flex-row w-full gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="xl:w-[55%] flex items-center xl:items-start flex-col"
          >
            <h2 className="font-serif text-3xl font-semibold md:text-4xl text-center lg:text-start px-6 lg:px-0">
              Time to Stop Losing Business to Competitors!
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <p className="mt-6 text-lg text-zinc-700">
              Start with our <span className="font-semibold">FREE Audit</span>
            </p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-2 text-md text-yellow-700 w-fit">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              We guarantee a
            </span>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 min-w-80 sm:min-w-170 p-2">
              <div className="overflow-hidden rounded-3xl bg-linear-to-br p-8 text-black bg-[url('/business/donut.webp')] h-fit ">
                <div className="text-6xl font-extrabold">15%</div>
                <div className="mt-2 text-xl font-semibold">ROAS</div>
                <p className="mt-1 text-sm opacity-80">improvement</p>
              </div>

              <div className="overflow-hidden rounded-3xl bg-linear-to-br from-pink-200 via-pink-300 to-rose-300 p-8 text-black bg-[url('/business/graph.webp')]">
                <h3 className="text-3xl font-bold leading-tight">
                  Custom <br /> Strategy
                </h3>
                <p className="mt-2 text-sm opacity-80">
                  for your business growth
                </p>
              </div>
            </div>
          </motion.div>
          {/* form started */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-xl w-full min-[1370px]:w-[40%]"
          >
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
            <h3 className="font-serif text-2xl lg:text-[34px] font-semibold">
              Fill The Form, Let’s Talk Growth.
            </h3>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className=" mt-4 lg:mt-8 space-y-4"
            >
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              {formError.name && (
                <p className="text-sm text-red-500 -mt-2">{formError.name}</p>
              )}
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              {formError.email && (
                <p className="text-sm text-red-500 -mt-2">{formError.email}</p>
              )}
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
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              {formError.industry && (
                <p className="text-sm text-red-500 -mt-2">
                  {formError.industry}
                </p>
              )}
              <button
                type="submit"
                className="mt-3 lg:mt-6 w-full rounded-lg bg-black py-3 text-base lg:text-lg font-semibold text-white transition hover:bg-zinc-900 hover:cursor-pointer"
              >
                {loading ? "Loading..." : "Get Your FREE Audit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* footer started */}
      <div className=" bg-[#1A1421] px-4 py-4 flex justify-center w-screen ">
        <div className="w-full max-w-340 flex flex-col-reverse items-center justify-between gap-4 xl:flex-row">
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
  );
}
