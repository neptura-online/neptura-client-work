import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import HoverScrollCard from "./HoverScrollCard";
import GalleryModal from "./GalleryModal";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const images = [
  "/gallery/gallery1.webp",
  "/gallery/gallery2.webp",
  "/gallery/gallery3.webp",
  "/gallery/gallery4.webp",
  "/gallery/gallery5.webp",
  "/gallery/gallery6.webp",
  "/gallery/gallery7.webp",
  "/gallery/gallery8.webp",
  "/gallery/gallery9.webp",
  "/gallery/gallery10.webp",
  "/gallery/gallery11.webp",
];

const GAP = 32;

const GallerySection = () => {
  const x = useMotionValue(0);
  const isTransitioningRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const [active, setActive] = useState<string | null>(null);
  const [cardWidth, setCardWidth] = useState(360);
  const [index, setIndex] = useState(images.length);

  const slides = useMemo(() => [...images, ...images, ...images], []);
  const STEP = cardWidth + GAP;
  const total = images.length;

  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 768,
    []
  );

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setCardWidth(Math.floor(w * 0.8));
      else if (w < 1024) setCardWidth(280);
      else setCardWidth(302);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    isTransitioningRef.current = true;

    const controls = animate(x, -index * STEP, {
      duration: 0.85,
      ease: [0.33, 1, 0.68, 1],
      onComplete: () => {
        isTransitioningRef.current = false;

        if (index >= total * 2) {
          x.set(-(index - total) * STEP);
          setIndex(index - total);
        } else if (index < total) {
          x.set(-(index + total) * STEP);
          setIndex(index + total);
        }
      },
    });

    return () => controls.stop();
  }, [index, STEP, total, x]);

  const startAutoPlay = () => {
    if (isMobile || intervalRef.current) return;

    intervalRef.current = window.setInterval(() => {
      if (!isTransitioningRef.current) {
        setIndex((p) => p + 1);
      }
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const next = () => {
    stopAutoPlay();
    setIndex((p) => p + 1);
  };

  const prev = () => {
    stopAutoPlay();
    setIndex((p) => p - 1);
  };

  return (
    <section className="relative w-full py-14 lg:py-20 bg-zinc-100">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto w-[90%] px-4 lg:max-w-335 relative z-10">
        <div className="mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-black leading-[1.5em]"
          >
            See What High-Converting <br />
            <span className="text-(--yellow-emarketing)">
              Landing Pages Look Like
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto mt-4 h-1 w-20 lg:w-30 rounded-full bg-(--yellow-emarketing)"
          />

          <p className="mt-6 text-base md:text-lg text-zinc-700">
            Browse real examples that guide visitors to convert.
          </p>
        </div>

        <div
          className=" overflow-hidden"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          <button
            onClick={prev}
            className="absolute left-0 border bottom-37 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 border bottom-37 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white shadow flex items-center justify-center hover:scale-105 transition"
          >
            <FiChevronRight />
          </button>

          <motion.div
            className="flex gap-8"
            style={{ x, willChange: "transform" }}
          >
            {slides.map((img, i) => (
              <div
                key={i}
                style={{ width: cardWidth }}
                className="shrink-0 transition-transform duration-300"
              >
                <HoverScrollCard
                  image={img}
                  onClick={() => {
                    stopAutoPlay();
                    setActive(img);
                  }}
                  onPreviewStart={stopAutoPlay}
                  onPreviewEnd={startAutoPlay}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {active && (
        <GalleryModal
          image={active}
          onClose={() => {
            setActive(null);
            startAutoPlay();
          }}
        />
      )}
    </section>
  );
};

export default GallerySection;
