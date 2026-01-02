import { useEffect, useMemo, useRef, useState } from "react";
import { counterData } from "../constant/constant";

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
      className={`relative flex flex-col items-center gap-2 px-6 py-4 text-center rounded-xl shadow-md bg-yellow-400
        ${index === 2 ? "col-span-2" : "col-span-1"}
        md:col-span-1 md:min-w-56
      `}
    >
      <h2 className="text-2xl md:text-5xl font-medium text-black">
        {count}
        <span className="text-black">{suffix || "+"}</span>
      </h2>
      <p className="text-zinc-900 font-bold font-serif">{text}</p>
    </div>
  );
};

const Counter = () => {
  return (
    <section className="relative bg-stone-950 w-full py-10 md:py-16 flex justify-center">
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('assets/noise.svg')] opacity-10 rounded-3xl" />

      <div className="mx-4 grid grid-cols-2 gap-2 md:flex md:gap-0 md:justify-between w-full max-w-6xl">
        {counterData.map((data, index) => (
          <CounterItem
            key={data.id}
            value={data.number}
            text={data.text}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Counter;
