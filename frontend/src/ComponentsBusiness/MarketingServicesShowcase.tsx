import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const services = [
  "/business/google-ads.webp",
  "/business/meta.webp",
  "/business/search-engine.webp",
  "/business/website.webp",
  "/business/whatsapp.webp",
];

export default function MarketingServicesShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((p) => (p + 1) % services.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const increase = () => {
    if (active > 3) {
      return setActive(0);
    }
    setActive((active) => active + 1);
  };
  const decrease = () => {
    if (active < 1) {
      return setActive(0);
    }
    setActive((active) => active - 1);
  };

  return (
    <section className="relative bg-[#f7f7fb] py-10 lg:py-20 overflow-hidden">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="text-center mb-6 lg:mb-14">
        <h2 className="font-serif text-3xl md:text-5xl text-black">
          Our 360° Digital Marketing Services
        </h2>
        <div className="mx-auto mt-4 h-0.5 w-24 bg-black/80" />
      </div>

      <div className="relative h-135 flex items-center justify-center perspective-[1800px] ">
        {services.map((img, i) => {
          const offset = i - active;
          const visible = Math.abs(offset) <= 2;

          if (!visible) return null;

          return (
            <motion.img
              onClick={() => setActive(i)}
              key={img}
              src={img}
              initial={false}
              animate={{
                x: offset * 280,
                rotateY: offset * -40,
                scale: offset === 0 ? 0.92 : 0.78,
                opacity: offset === 0 ? 0.85 : 0.35,
                translateZ: offset === 0 ? -120 : -420,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
              }}
              className="absolute w-60 h-120 md:w-70 md:h-150 rounded-2xl shadow-2xl "
            />
          );
        })}

        <motion.img
          src="/business/iframe.png"
          alt="Phone"
          className="relative z-30 h-110 w-60 md:h-130 md:w-70 drop-shadow-[0_40px_80px_rgba(0,0,0,0.25)] pointer-events-none"
        />
        <button
          onClick={increase}
          className="hidden lg:flex absolute p-3 bg-gray-400 text-2xl text-black z-20 right-100 rounded-lg"
        >
          <SlArrowRight />
        </button>
        <button
          onClick={decrease}
          className="hidden lg:flex absolute p-3 bg-gray-400 text-2xl text-black z-20 left-100 rounded-lg"
        >
          <SlArrowLeft />
        </button>
      </div>

      <div className="md:hidden relative mt-10 flex justify-center gap-2">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? "w-8 bg-black" : "w-2 bg-black/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
