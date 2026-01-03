import { motion } from "framer-motion";
import Heading from "./Helper/Heading";
import type { InfiniteColumnProps, TestimonialCardProps } from "../types/type";
import { testimonials } from "../constant/constant";

const TestimonialCard = ({
  text,
  imageSrc,
  name,
  username,
}: TestimonialCardProps) => {
  return (
    <div className="rounded-2xl bg-zinc-800 p-6 shadow-sm border border-black/5">
      <p className="text-sm leading-relaxed text-white/80">{text}</p>

      <div className="flex items-center gap-3 mt-6">
        <img
          src={imageSrc}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="leading-tight">
          <p className="font-semibold text-white text-sm">{name}</p>
          <p className="text-xs text-white/50">{username}</p>
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

export const Testimonials = () => {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-10 my-10">
      <div className="relative text-center max-w-7xl mx-auto px-6 z-20">
        <Heading white="Client Success " yellow="Stories & Testimonials" />
      </div>

      <div className="relative mx-5 sm:mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-130 overflow-hidden">
          <InfiniteColumn items={firstColumn} duration={22} />

          <InfiniteColumn items={secondColumn} duration={18} />

          <InfiniteColumn items={thirdColumn} duration={25} />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-linear-to-t from-zinc-950 via-zinc-900 to-zinc-850 z-10" />

      <div className="pointer-events-none absolute top-20 left-0 h-40  w-full bg-linear-to-t from-zinc-850 via-zinc-900 to-zinc-950 z-10" />
    </section>
  );
};
