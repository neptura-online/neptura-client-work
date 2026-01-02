import {
  FiUser,
  FiEye,
  FiTool,
  FiBarChart2,
  FiTrendingUp,
  FiArrowRight,
} from "react-icons/fi";
import { motion } from "framer-motion";

const items = [
  { icon: <FiUser size={32} />, label: "Business-Owner Mindset" },
  { icon: <FiEye size={32} />, label: "Transparent Process" },
  { icon: <FiTool size={32} />, label: "Control in Your Hands" },
  { icon: <FiBarChart2 size={32} />, label: "Consistent Lead Generation" },
  { icon: <FiTrendingUp size={32} />, label: "ROI-Driven Approach" },
];

export default function WhyWorkWithUsExact() {
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-360 px-3 lg:px-6">
        <div className="flex flex-col-reverse items-start gap-14 lg:flex-row">
          <div className="relative">
            <div className="bg-[url('/business/bg.png')] pt-4 pl-1 relative overflow-hidden rounded-[28px]">
              <img
                src="/business/about.png"
                alt="Client reaction"
                className="h-full w-full object-cover rounded-[28px]"
              />
            </div>

            <motion.img
              initial={{ x: -10 }}
              animate={{ x: 60 }}
              transition={{ duration: 2, ease: "backIn", repeat: Infinity }}
              src="/business/review.png"
              alt="Client reaction"
              className="h-30 absolute -bottom-15 object-cover rounded-[28px] z-20"
            />
          </div>

          <div className="mt-4 flex flex-col items-center sm:items-start">
            <h2 className="font-serif font-semibold text-3xl md:text-5xl">
              Why Work With Us?
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <p className="mt-4 max-w-2xl text-zinc-600 text-center px-2 sm:px-0 sm:text-start">
              You deserve a partner who understands your challenges and is
              committed to your success.
            </p>

            <div className="relative mt-6 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-12">
              <div className="absolute left-20 right-0 top-10 h-px z-10 bg-zinc-300" />
              <div className="absolute left-20 right-32 top-56 h-px z-10 bg-zinc-300" />

              {items.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto relative flex h-25 w-25 items-center justify-center rounded-full bg-zinc-900 text-yellow-emarketing z-20">
                    {item.icon}
                  </div>
                  <p className="mt-4 font-medium text-zinc-900">{item.label}</p>
                </div>
              ))}
            </div>

            <button className="mt-14 inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-white transition hover:bg-zinc-900">
              Connect With Us
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
