import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { steps } from "../constant/constant";
import Heading from "./Helper/Heading";
import sampleBg from "/assets/online.webp";

const GAP = 24;

interface Step {
  title: string;
  desc: string;
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
    <section className="relative overflow-hidden bg-zinc-950 py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
      <div className="mx-2 px-4 lg:mx-auto lg:max-w-6xl">
        <div className="mb-12 text-center">
          <Heading white="Our Highly" yellow="Converting Approach" />
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
                className="shrink-0 rounded-2xl bg-zinc-900 shadow-lg shadow-black"
              >
                <img
                  src={sampleBg}
                  alt={step.title}
                  loading="lazy"
                  className="h-38 w-full rounded-t-2xl object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-md font-semibold text-yellow-500">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-300">{step.desc}</p>
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
