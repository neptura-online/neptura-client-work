import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import HoverScrollCard from "./HoverScrollCard";
import GalleryModal from "./GalleryModal";

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

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setCardWidth(Math.floor(w * 0.75));
      else if (w < 1024) setCardWidth(280);
      else setCardWidth(300);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    isTransitioningRef.current = true;

    const controls = animate(x, -index * STEP, {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
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
  }, [index, STEP, total, x, isMobile]);

  const startAutoPlay = () => {
    if (isMobile) return;
    if (intervalRef.current) return;

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

      <div className="mx-auto px-4 lg:max-w-340 relative z-10">
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
            Swipe or drag through real examples that guide visitors to convert.
          </p>
          {isMobile && (
            <p className="mt-2 text-sm text-zinc-500">← Swipe to explore →</p>
          )}
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onTouchStart={stopAutoPlay}
        >
          <motion.div
            className="flex gap-8 cursor-grab active:cursor-grabbing"
            style={{ x, willChange: "transform" }}
            drag="x"
            dragElastic={isMobile ? 0 : 0.08}
            dragMomentum={true}
            dragConstraints={{
              left: -STEP * (slides.length - 1),
              right: 0,
            }}
            onDragStart={stopAutoPlay}
            onDragEnd={(_, info) => {
              if (isMobile) return;
              if (info.offset.x < -60) setIndex((p) => p + 1);
              else if (info.offset.x > 60) setIndex((p) => p - 1);

              startAutoPlay();
            }}
          >
            {slides.map((img, i) => (
              <div key={i} style={{ width: cardWidth }} className="shrink-0">
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
