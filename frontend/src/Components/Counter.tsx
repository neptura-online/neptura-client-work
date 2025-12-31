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

const CounterItem = ({ value, text, isLast }: any) => {
  const { numeric, suffix } = useMemo(() => parseValue(value), [value]);
  const { count, ref } = useCountUp(numeric);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center gap-2 px-6 py-4 text-center ${
        !isLast ? "border-b md:border-b-0 md:border-r border-black/20" : ""
      }`}
    >
      <h2 className="text-4xl font-extrabold tracking-tight">
        {count}
        <span className="text-black">{suffix || "+"}</span>
      </h2>

      <p className="text-sm font-medium opacity-90">{text}</p>
    </div>
  );
};

const Counter = () => {
  return (
    <section className="bg-zinc-950 w-full relative lg:py-16 flex justify-center ">
      <div className="mx-4 lg:flex w-full sm:hidden lg:max-w-6xl flex-col items-center gap-8 rounded-3xl bg-yellow-500 px-6 py-8 text-black shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:flex-row md:justify-between md:px-12">
        {counterData.map((data, index) => (
          <CounterItem
            key={data.id}
            value={data.number}
            text={data.text}
            isLast={index === counterData.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Counter;
