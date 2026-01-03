import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from "react-icons/fi";
import { services } from "../constant/constant";
import Heading from "./Helper/Heading";
import type { OpenFormProps } from "../types/type";

const CarouselCard = memo(
  ({
    service,
    offset,
    isActive,
    isMobile,
    onHover,
    onClick,
  }: {
    service: any;
    offset: number;
    isActive: boolean;
    isMobile: boolean;
    onHover: (hovered: boolean) => void;
    onClick: () => void;
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
              ? "bg-linear-to-b from-yellow-500 to-transparent shadow-[0_25px_60px_-15px_rgba(255,204,0,0.3)]"
              : "bg-white/10"
          }`}
        >
          <div className="w-full h-full rounded-[23px] bg-[#0a0a0a] p-8 md:p-10 flex flex-col justify-between items-start overflow-hidden relative">
            {isActive && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl rounded-full" />
            )}

            <div className="relative z-10">
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-8 transition-all duration-500 ${
                  isActive
                    ? "bg-yellow-500 text-black rotate-6"
                    : "bg-white/5 text-white/30"
                }`}
              >
                {service.icon}
              </div>
              <h3
                className={`text-2xl md:text-3xl font-serif font-medium mb-4 tracking-tight leading-tight ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {service.title}
              </h3>
            </div>

            <div className="relative z-10 w-full flex justify-between items-center group">
              <span
                className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                  isActive ? "text-yellow-500" : "text-white/20"
                }`}
              >
                Contact Us
              </span>
              <div
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "border-yellow-500 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black"
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

  const nextSlide = useCallback(
    () => setActiveIdx((prev) => (prev + 1) % services.length),
    []
  );
  const prevSlide = useCallback(
    () =>
      setActiveIdx((prev) => (prev - 1 + services.length) % services.length),
    []
  );

  const handleHover = useCallback(
    (hovered: boolean) => setIsHovered(hovered),
    []
  );
  const triggerButton = () => {
    setOpenForm(true);
    setId("book landing");
  };
  return (
    <section className="py-10 lg:py-20 bg-zinc-950 text-white overflow-hidden relative selection:bg-yellow-500 selection:text-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%yellow-5005_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-2">
          <Heading
            white="Other Digital"
            yellow="Marketing Services
"
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
                />
              );
            })}
          </AnimatePresence>
        </div>

        <div className="xl:hidden mt-2 lg:mt-5 flex flex-col items-center gap-8">
          <div className=" hidden lg:flex items-center gap-6">
            <button
              onClick={prevSlide}
              className="p-3 lg:p-4 rounded-full border border-white/10 hover:border-yellow-500 hover:text-yellow-500 transition-all bg-white/5 backdrop-blur-md"
            >
              <FiChevronLeft size={24} />
            </button>

            <div className="flex gap-2">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${
                    activeIdx === i ? "w-10 bg-yellow-500" : "w-2 bg-white/10"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 lg:p-4 rounded-full border border-white/10 hover:border-yellow-500 hover:text-yellow-500 transition-all bg-white/5 backdrop-blur-md"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          <button
            onClick={triggerButton}
            className="px-8 py-4 bg-yellow-500 text-black font-semibold uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(255,204,0,0.2)] hover:shadow-[0_0_50px_rgba(255,204,0,0.4)] transition-all transform hover:-translate-y-1 text-sm"
          >
            Book a Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default ThreeDCarousel;
