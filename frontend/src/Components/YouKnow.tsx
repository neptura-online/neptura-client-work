import { motion } from "framer-motion";

const YouKnow = () => {
  return (
    <section className="relative w-full bg-zinc-100 overflow-hidden py-10">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative mx-auto max-w-300 px-6 text-center py-10 flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-[42px] font-medium leading-[1.4em] text-black capitalize text-left"
          >
            And did you know?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className=" mt-4 h-1 w-20 mx-auto lg:mx-0 lg:w-30 rounded-full bg-(--yellow-emarketing)"
          />
        </div>

        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mx-auto mt-6 max-w-3xl text-base md:text-xl text-zinc-800 leading-relaxed text-center lg:text-left"
          >
            Even a{" "}
            <span className="text-zinc-900 bold">
              <span className="text-(--yellow-emarketing)">1%</span> change in
              conversion rate
            </span>{" "}
            can significantly impact your monthly sales. Imagine the impact when
            your conversion lift becomes{" "}
            <span className="text-(--yellow-emarketing)">20%</span>...{" "}
            <span className="text-(--yellow-emarketing)">30%</span>… or even{" "}
            <span className="text-(--yellow-emarketing)">40</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-base  text-zinc-800 text-left"
          ></motion.p>
        </div>
      </div>
    </section>
  );
};

export default YouKnow;
