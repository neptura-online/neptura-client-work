import { motion } from "framer-motion";

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "167+", label: "Clients Trust Us" },
  { value: "37+", label: "Industries Served" },
  { value: "15+", label: "Countries Served" },
  { value: "83%", label: "Client Retention Rate" },
];

export default function NumbersSection() {
  return (
    <section className="relative overflow-hidden bg-[#1A1421] py-14 lg:py-24 text-white">
      <div
        className="absolute inset-0 opacity-90  rotate-2"
        style={{
          backgroundImage: "url('/business/dotted-map.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />
      <div
        className="absolute inset-0 opacity-40 -bottom-60"
        style={{
          backgroundImage: "url('/business/Shape2.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      <div className="relative mx-auto w-full max-w-350 px-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-1 text-md  font-medium text-yellow-600">
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            Promises Mean Nothing!
          </span>

          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            So Here Are The Numbers You Can Trust.
          </h2>

          <div className="mx-auto mt-6 h-0.5 w-24 bg-white/80" />
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl bg-white px-2 lg:px-8 py-4 lg:py-7 text-center shadow-xl"
            >
              <div className="text-5xl font-bold text-yellow-emarketing md:text-6xl">
                {stat.value}
              </div>
              <p className="mt-3 text-base font-serif lg:text-lg font-semibold text-zinc-900 leading-[1.1em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
