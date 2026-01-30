import { motion } from "framer-motion";

const STACK = ["React Js", "Node Js", "WordPress", "PHP"];

export default function TechStackStrip() {
  return (
    <section className="relative w-full py-16 bg-linear-to-b bg-gray-100 text-black overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl md:text-[40px] text-black"
        >
          We Create High Speed{" "}
          <span className="text-(--yellow-emarketing)">
            Landing Pages Using
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.12 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {STACK.map((tech) => (
            <motion.div
              key={tech}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="
                px-7 py-3 text-lg font-medium rounded-xl
                bg-[#1b0f27]
                border border-white/10
                text-white
                shadow-lg shadow-black/40
                backdrop-blur
                transition-all duration-300
                hover:border-(--yellow-emarketing)
                hover:shadow-[0_0_18px_rgba(255,183,0,0.35)]
                hover:text-(--yellow-emarketing)
              "
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
