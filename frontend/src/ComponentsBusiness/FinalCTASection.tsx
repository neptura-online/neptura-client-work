import { motion } from "framer-motion";

export default function FinalCTASection() {
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
            <h2 className="font-serif text-3xl font-medium md:text-4xl text-center lg:text-start px-6 lg:px-0">
              Time to Stop Losing Business to Competitors!
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <p className="mt-6 text-lg text-zinc-700">
              Start with our <span className="font-semibold">FREE Audit</span>
            </p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-2 text-sm text-yellow-700 w-fit">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              We guarantee a
            </span>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 min-w-80 sm:min-w-170 lg:min-w-200">
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-xl xl:w-[40%]"
          >
            <h3 className="font-serif text-2xl lg:text-[34px] font-semibold">
              Fill The Form, Let’s Talk Growth.
            </h3>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <form className=" mt-4 lg:mt-8 space-y-4">
              <input
                type="text"
                placeholder="Name*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              <input
                type="email"
                placeholder="Email*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              <input
                type="tel"
                placeholder="Phone*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Industry*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="mt-3 lg:mt-6 w-full rounded-lg bg-black py-3 text-base lg:text-lg font-semibold text-white transition hover:bg-zinc-900"
              >
                Get Your FREE Audit
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className=" bg-[#1A1421] py-4 flex justify-center w-screen ">
        <div className="w-full max-w-340 flex flex-col items-center justify-between gap-4 xl:flex-row">
          <p className="text-xs text-white/90">
            © {new Date().getFullYear()} e-Marketing. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/90">
            <a href="#" className="transition hover:text-yellow-emarketing">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-yellow-emarketing">
              Cookies Policy
            </a>
            <a href="#" className="transition hover:text-yellow-emarketing">
              Data Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
