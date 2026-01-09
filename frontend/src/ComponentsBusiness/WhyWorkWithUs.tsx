import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import WorkIcon from "./Helper/WorkIcon";

const items = [
  { url: "/icons/Business-Owner.webp", label: "Business-Owner Mindset" },
  { url: "/icons/Transparent.webp", label: "Transparent Process" },
  { url: "/icons/Hands.webp", label: "Control in Your Hands" },
  { url: "/icons/Lead_Generation.webp", label: "Consistent Lead Generation" },
  { url: "/icons/ROI-Driven.webp", label: "ROI-Driven Approach" },
];

export default function WhyWorkWithUsExact({
  setOpenForm,
  setId,
}: OpenFormProps) {
  const handleClick = () => {
    setOpenForm(true);
    setId("hero lets work together");
  };
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-360 px-3 md:px-6">
        <div className="flex flex-col-reverse items-center lg:items-start gap-14 lg:flex-row">
          <div className="relative">
            <div className="pt-4 pl-1 relative overflow-hidden rounded-[28px]">
              <img
                src="/business/bg.webp"
                alt="Client reaction"
                className="absolute inset-0 z-0 w-full h-full object-cover"
                loading="eager"
              />
              <img
                src="/business/about.webp"
                alt="Client reaction"
                className="relative h-full z-10 w-full object-cover rounded-[28px]"
                loading="lazy"
              />
            </div>

            <motion.img
              src="/business/review.webp"
              alt="Client reaction"
              className="h-30 absolute -bottom-15 object-cover rounded-[28px] z-20"
              animate={{
                x: [-10, 60],
                y: [0, -6],
                scale: [1, 1.02],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="mt-4 flex flex-col items-center lg:items-start">
            <h2 className="font-serif font-semibold text-3xl md:text-[45px]">
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
                  <div className="mx-auto relative flex h-25 w-25 items-center justify-center rounded-full bg-zinc-900 text-(--yellow-emarketing) z-20">
                    <WorkIcon url={item.url} alt={item.label} />
                  </div>
                  <p className="mt-4 font-medium text-zinc-900">{item.label}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleClick}
              className="mt-14 inline-flex items-center gap-2 rounded-lg bg-black px-8 py-3 text-white transition hover:bg-zinc-900"
            >
              Connect With Us
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
