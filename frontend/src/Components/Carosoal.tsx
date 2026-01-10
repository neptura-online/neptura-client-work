import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { services } from "../constant/constant";
import type { OpenFormProps } from "../types/type";

const CarouselCard = memo(
  ({
    service,
    offset,
    isActive,
    isMobile,
    onHover,
    onClick,
    triggerButton,
  }: {
    service: any;
    offset: number;
    isActive: boolean;
    isMobile: boolean;
    onHover: (hovered: boolean) => void;
    onClick: () => void;
    triggerButton: () => void;
  }) => {
    const absOffset = Math.abs(offset);
    if (absOffset > (isMobile ? 1 : 2)) return null;

    return (
      <motion.div
        key={service.title}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isActive ? 1 : 0.4,
          scale: isActive ? 1 : 0.8,
          x: offset * (isMobile ? 180 : 320),
          z: isActive ? 100 : -absOffset * 200,
          rotateY: offset * (isMobile ? -15 : -30),
          zIndex: 10 - absOffset,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        onClick={onClick}
        className="absolute w-60 md:w-80 h-87 md:h-100 cursor-pointer"
      >
        <div
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className={`w-full h-full rounded-3xl p-px transition-all duration-500 hover:scale-105 ${
            isActive
              ? "bg-linear-to-b from-black to-transparent shadow-[0_25px_60px_-15px_rgba(255,204,0,0.3)]"
              : "bg-white/10"
          }`}
        >
          <div className="w-full h-full rounded-[23px] bg-white p-8 md:p-10 flex flex-col justify-between items-start overflow-hidden relative">
            {isActive && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full" />
            )}

            <div className="relative z-10">
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 transition-all duration-500 ${
                  isActive
                    ? "bg-(--yellow-emarketing) text-black rotate-6"
                    : "bg-white/5 text-black/30"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`text-2xl md:text-3xl font-serif font-medium mb-4 tracking-tight leading-tight ${
                  isActive ? "text-black" : "text-zinc-800"
                }`}
              >
                {service.title}
              </h3>
            </div>

            <div className="relative z-10 w-full flex justify-between items-center group">
              <span
                onClick={triggerButton}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  isActive ? "text-black" : "text-white/20"
                }`}
              >
                Contact Us
              </span>
              <div
                onClick={triggerButton}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "border-black text-black group-hover:bg-(--yellow-emarketing) group-hover:text-black"
                    : "border-white/10 text-white/10"
                }`}
              >
                <FiArrowUpRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

const ThreeDCarousel = ({ setOpenForm, setId }: OpenFormProps) => {
  const intervalRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % services.length);
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHover = useCallback(
    (hovered: boolean) => setIsHovered(hovered),
    []
  );
  const triggerButton = () => {
    setOpenForm(true);
    setId("book landing");
  };
  return (
    <section className="py-10 lg:py-20 bg-zinc-100 text-black overflow-hidden relative selection:bg-yellow-500 selection:text-black">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="container mx-auto px-6 relative z-10 max-w-350">
        <div className="text-center mb-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-black leading-[1.2em] capitalize"
          >
            Other Digital{" "}
            <span className="text-(--yellow-emarketing)">
              Marketing Services
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-yellow-500"
          />
        </div>

        <div className="relative w-full h-112 md:h-138 flex items-center justify-center perspective-distant">
          <AnimatePresence mode="popLayout">
            {services.map((service, i) => {
              let offset = i - activeIdx;
              if (offset > services.length / 2) offset -= services.length;
              if (offset < -services.length / 2) offset += services.length;
              return (
                <CarouselCard
                  key={service.title}
                  service={service}
                  offset={offset}
                  isActive={i === activeIdx}
                  isMobile={isMobile}
                  onHover={handleHover}
                  onClick={() => setActiveIdx(i)}
                  triggerButton={triggerButton}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
