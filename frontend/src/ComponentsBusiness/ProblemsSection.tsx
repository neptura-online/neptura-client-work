import { motion } from "framer-motion";
import type { OpenFormProps } from "../types/type";
import { FiArrowRight } from "react-icons/fi";

type Problem = {
  id: number;
  url: string;
  text: string;
};

interface WorkIcon {
  url: string;
  alt: string;
}

const WorkIcon = ({ url, alt }: WorkIcon) => {
  return <img src={`${url}`} alt={alt} className="h-13 w-13" />;
};

const problems: Problem[] = [
  {
    id: 1,
    url: "/icons/prob1.webp",
    text: "Your ideal clients don’t know you exist.",
  },
  {
    id: 2,
    url: "/icons/prob2.webp",
    text: "Your competitors are running targeted ads and taking the leads.",
  },
  {
    id: 3,
    url: "/icons/prob3.webp",
    text: "You are not sure which platform or strategy will deliver results for your business.",
  },
  {
    id: 4,
    url: "/icons/prob4.webp",
    text: "Your website is just a “digital visiting card” instead of a “sales machine.”",
  },
  {
    id: 5,
    url: "/icons/prob5.webp",
    text: "Burnt money on wrong campaigns, leaving you hesitant to invest again.",
  },
];

export default function ProblemsSection({ setId, setOpenForm }: OpenFormProps) {
  const handleClick = () => {
    setOpenForm(true);
    setId("hero lets work together");
  };
  return (
    <section className="relative bg-zinc-100 py-14  lg:py-20">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="mx-auto max-w-350 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[35px] font-serif font-medium md:text-[45px]">
            The Real Problem Nobody Talks About
          </h2>
          <p className="mt-4 text-zinc-600 text-base">
            Your business isn’t failing because your product/service is bad.
            It’s failing because:
          </p>
          <div className="mx-auto mt-6 h-0.5 w-20 bg-black" />
        </motion.div>

        <div className="relative mt-10 hidden lg:grid grid-cols-5 gap-10">
          <svg
            className="absolute left-0 right-0 top-10 mx-auto w-full"
            height="40"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 20 L 300 12 L 500 20 L 700 12 L 900 20"
              fill="none"
              stroke="#d4d4d8"
              strokeWidth="1.5"
              strokeDasharray="3 6"
            />
          </svg>

          {problems.map((p) => (
            <div key={p.id} className="flex flex-col items-center text-center">
              <div className="relative flex items-center justify-center rounded-full  text-black">
                <div className="mx-auto relative flex h-25 w-25 items-center justify-center rounded-full bg-(--yellow-emarketing) ">
                  <WorkIcon url={p.url} alt={p.text} />
                </div>
                <span className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-md font-bold shadow italic text-[#071E31]">
                  {p.id}.
                </span>
              </div>
              <p className="mt-6 text-base text-zinc-700">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-6 lg:hidden">
          <svg
            className="absolute left-1/2 top-0 h-full -translate-x-1/2"
            width="2"
            viewBox="0 0 2 1200"
            preserveAspectRatio="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="1200"
              stroke="#d4d4d8"
              strokeWidth="1.5"
              strokeDasharray="4 6"
            />
          </svg>

          {problems.map((p, i) => (
            <div
              key={p.id}
              className={`relative flex flex-col items-center text-center ${
                i === problems.length - 1 ? "col-span-2" : ""
              }`}
            >
              <div className="relative flex  items-center justify-center rounded-full text-black">
                <div className="mx-auto relative flex h-25 w-25 items-center justify-center rounded-full bg-(--yellow-emarketing)">
                  <WorkIcon url={p.url} alt={p.text} />
                </div>
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold shadow italic text-[#071E31]">
                  {p.id}.
                </span>
              </div>
              <p className="mt-4 text-sm text-zinc-700">{p.text}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 text-center"
        >
          <p className="mb-6 text-lg text-zinc-700">
            But here’s the good news. We can fix that.
          </p>
          <button
            onClick={handleClick}
            className="relative inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-white transition hover:bg-zinc-900"
          >
            Consult Our Marketing Experts
            <FiArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
