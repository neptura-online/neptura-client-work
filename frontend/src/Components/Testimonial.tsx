import { motion } from "framer-motion";
import type { InfiniteColumnProps, TestimonialCardProps } from "../types/type";
import { testimonials } from "../constant/constant";

const TestimonialCard = ({
  text,
  imageSrc,
  name,
  username,
}: TestimonialCardProps) => {
  return (
    <div className="rounded-2xl bg-zinc-100 p-6 shadow-sm border border-black/5">
      <p className="text-sm leading-relaxed text-black/80">{text}</p>

      <div className="flex items-center gap-3 mt-6">
        <img
          src={imageSrc}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="font-semibold text-black text-sm">{name}</p>
          <p className="text-xs text-black/50">{username}</p>
        </div>
      </div>
    </div>
  );
};

const InfiniteColumn = ({ items, duration = 20 }: InfiniteColumnProps) => {
  return (
    <motion.div
      className="flex flex-col gap-6"
      animate={{ y: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration,
      }}
      whileHover={{ animationPlayState: "paused" }}
    >
      {[...items, ...items].map((item, idx) => (
        <TestimonialCard key={idx} {...item} />
      ))}
    </motion.div>
  );
};

const Testimonials = () => {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="relative overflow-hidden bg-[#160a1f] py-20">
      <div className="relative text-center max-w-7xl mx-auto py-6 z-20">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-white leading-[1.2em] capitalize"
          >
            client Success <br className="lg:hidden" />
            <span
              className="text-(--yellow-emarketing)
"
            >
              Stories & Testimonials
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-(--yellow-emarketing)
"
          />
        </div>

        <p className="mt-6 text-base text-zinc-100">
          Stop losing customers due to missed or mishandled calls!
        </p>
      </div>

      <div className="relative mx-5 sm:mx-auto max-w-350 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-130 overflow-hidden">
          <InfiniteColumn items={firstColumn} duration={22} />

          <InfiniteColumn items={secondColumn} duration={18} />

          <InfiniteColumn items={thirdColumn} duration={25} />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-[#160a1f] via-[#160a1f] to-transparent z-10" />

      <div className="pointer-events-none absolute top-60 left-0 h-40  w-full bg-linear-to-b from-[#160a1f] via-[#160a1f] to-transparent z-10" />
    </section>
  );
};

export default Testimonials;
