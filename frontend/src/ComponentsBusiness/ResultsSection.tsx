import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function ResultsSection() {
  return (
    <section className="relative bg-zinc-100 py-10 lg:py-20">
      <div className="mx-auto max-w-350 px-3 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-1.5 text-sm text-white">
            <span className="h-2 w-2 rounded-full bg-white" />
            Achieve Real Results
          </span>

          <h2 className="mt-6 font-serif text-3xl md:text-5xl">
            We Can Achieve Real Results For Your Business!
          </h2>

          <div className="mx-auto mt-6 h-0.5 w-24 bg-black" />

          <p className="mx-auto mt-6 max-w-4xl text-zinc-600">
            Our proven strategies are designed to deliver measurable results by
            combining data, creativity, and sales-focused execution.
          </p>
        </motion.div>

        <div className="mt-4 grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-9"
          >
            <p className="text-lg text-zinc-700 lg:px-16 text-center sm:text-start">
              Here’s how we help you succeed:
            </p>

            <div className="relative pl-16">
              <span className="absolute left-0 top-0 text-6xl font-bold text-zinc-200 italic">
                1.
              </span>
              <h3 className="text-2xl font-semibold font-serif">
                Drive Website Traffic
              </h3>
              <p className="mt-2 text-zinc-600">
                SEO, Local SEO, and Content Marketing Services ensure your brand
                gets discovered by the right audience.
              </p>
            </div>

            <div className="relative pl-16">
              <span className="absolute left-0 top-0 text-6xl font-bold text-zinc-200 italic">
                2.
              </span>
              <h3 className="text-2xl font-semibold font-serif">
                Create & Manage Powerful Ad Campaigns
              </h3>
              <p className="mt-2 text-zinc-600">
                Targeted PPC Management and Social Media Advertising to generate
                qualified leads and sales.
              </p>
            </div>

            <div className="relative pl-16">
              <span className="absolute left-0 top-0 text-6xl font-bold text-zinc-200 italic">
                3.
              </span>
              <h3 className="text-2xl font-semibold font-serif">
                Improve Brand Messaging & Conversions
              </h3>
              <p className="mt-2 text-zinc-600">
                Website Designing, Landing Page Optimization, and Social Media
                Management for stronger engagement and higher conversion rates.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center"
          >
            <img
              src="/business/achieve.webp"
              alt="Marketing illustration"
              className="w-full max-w-2xl"
            />

            <button className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-white transition hover:bg-zinc-900">
              Optimize My Marketing
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
