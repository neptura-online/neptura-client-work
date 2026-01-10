import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import WorkIcon from "../ComponentsBusiness/Helper/WorkIcon";

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
    <section className="bg-zinc-100 py-6">
      <div className="mx-auto max-w-350 px-3 md:px-6">
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
              <div className="absolute lg:max-w-60 left-20 top-48 right-10 lg:right-32 lg:top-42 h-px z-10 bg-zinc-300" />

              {items.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto relative flex h-18 w-18 items-center justify-center rounded-full bg-[#160a1f] text-(--yellow-emarketing) z-20">
                    <WorkIcon url={item.url} alt={item.label} />
                  </div>
                  <p className="mt-4 font-medium text-zinc-900">{item.label}</p>
                </div>
              ))}
            </div>

            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className=" mt-14 w-fit inline-flex items-center gap-2 rounded-2xl bg-(--yellow-emarketing) px-6 py-3 font-semibold text-sm text-black"
            >
              Connect With Us <FiArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
