import { useEffect, useMemo, useRef, useState } from "react";
import { counterData } from "../constant/constant";
import { motion } from "framer-motion";

const parseValue = (value: string) => {
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  return { numeric, suffix };
};

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);
  const frame = useRef<number | null>(null);
  const current = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        observer.disconnect();

        const startTime = performance.now();

        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const value = Math.floor(progress * end);

          if (value !== current.current) {
            current.current = value;
            setCount(value);
          }

          if (progress < 1) {
            frame.current = requestAnimationFrame(animate);
          }
        };

        frame.current = requestAnimationFrame(animate);
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [end, duration]);

  return { count, ref };
};

const CounterItem = ({ value, text, index }: any) => {
  const { numeric, suffix } = useMemo(() => parseValue(value), [value]);
  const { count, ref } = useCountUp(numeric);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center gap-2 px-6 py-6 text-center rounded-xl shadow-md bg-(--yellow-emarketing)
        ${index === 2 ? "col-span-2" : "col-span-1"}
        md:col-span-1 md:min-w-65
      `}
    >
      <h2 className="text-4xl md:text-5xl font-medium text-black">
        {count}
        <span className="text-black">{suffix || "+"}</span>
      </h2>
      <p className="text-zinc-900 font-bold font-serif">{text}</p>
    </div>
  );
};

const Counter = () => {
  return (
    <section className="relative bg-zinc-100 w-full py-10 md:py-16 flex justify-center">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="max-w-350 w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-semibold leading-[1.5em] px-2">
            We Have Helped{" "}
            <span className="text-(--yellow-emarketing) font-sans">
              167+ Businesses
            </span>{" "}
            Generate <br />
            <span className="text-(--yellow-emarketing) font-sans">
              ₹923+ Crores
            </span>{" "}
            In Revenue
          </h2>

          <div className="mx-auto mt-12 h-0.5 w-24 bg-white/80" />
        </motion.div>
        <div className="mx-4 grid grid-cols-2 gap-2 xl:flex xl:gap-0 xl:justify-between ">
          {counterData.map((data, index) => (
            <CounterItem
              key={data.id}
              value={data.number}
              text={data.text}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
