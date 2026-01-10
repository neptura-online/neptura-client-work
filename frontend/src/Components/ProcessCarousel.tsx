import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { steps } from "../constant/constant";

const GAP = 24;

interface Step {
  title: string;
  desc: string;
  url: string;
}

const ProcessCarousel = () => {
  const x = useMotionValue(0);

  const isTransitioningRef = useRef(false);
  const resizeRafRef = useRef<number | null>(null);

  const [cardWidth, setCardWidth] = useState(320);
  const [index, setIndex] = useState(steps.length);

  const typedSteps = useMemo(() => steps as Step[], []);
  const slides = useMemo(
    () => [...typedSteps, ...typedSteps, ...typedSteps],
    [typedSteps]
  );

  const STEP = cardWidth + GAP;
  const total = typedSteps.length;

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;

      if (w < 640) setCardWidth(Math.floor(w * 0.75));
      else if (w < 1020) setCardWidth(250);
      else if (w < 1700) setCardWidth(260);
      else setCardWidth(270);
    };

    const onResize = () => {
      if (resizeRafRef.current) return;

      resizeRafRef.current = requestAnimationFrame(() => {
        updateWidth();
        resizeRafRef.current = null;
      });
    };

    updateWidth();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, []);

  useEffect(() => {
    isTransitioningRef.current = true;

    const controls = animate(x, -index * STEP, {
      duration: 0.6,
      ease: "easeInOut",
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

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!isTransitioningRef.current) {
        setIndex((prev) => prev + 1);
      }
    }, 3000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#160a1f] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('assets/noise.svg')] opacity-10" />
      <div className="mx-2 px-4 lg:mx-auto lg:max-w-340">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[40px] font-medium text-white leading-[1.2em] capitalize"
          >
            Our Approach To Highly Converting <br />
            <span
              className="text-(--yellow-emarketing)
"
            >
              Landing Page
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

        <div className="overflow-hidden">
          <motion.div
            className="mb-4 flex gap-6 cursor-grab active:cursor-grabbing"
            style={{ x, willChange: "transform" }}
            drag="x"
            dragElastic={0.08}
            dragConstraints={{
              left: -STEP * (slides.length - 1),
              right: 0,
            }}
            onDragStart={() => {
              isTransitioningRef.current = true;
            }}
            onDragEnd={(_, info) => {
              isTransitioningRef.current = false;

              if (info.offset.x < -50) setIndex((p) => p + 1);
              else if (info.offset.x > 50) setIndex((p) => p - 1);
            }}
          >
            {slides.map((step, i) => (
              <div
                key={i}
                style={{ width: cardWidth }}
                className="shrink-0 rounded-2xl bg-zinc-100 shadow-lg shadow-black"
              >
                <img
                  src={step.url}
                  alt={step.title}
                  loading="lazy"
                  className="h-38 w-full rounded-t-2xl object-cover"
                />

                <div className="p-4 text-center">
                  <h3 className="text-md font-semibold font-serif text-(--yellow-emarketing)">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-950">{step.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {typedSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i + total)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                index % total === i ? "bg-yellow-500" : "bg-zinc-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessCarousel;
