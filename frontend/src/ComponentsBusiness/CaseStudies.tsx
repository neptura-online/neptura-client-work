import { motion } from "framer-motion";

const cardVariants = {
  rest: {
    backgroundColor: "#ffffff",
  },
  hover: {
    backgroundColor: "#18181b", // zinc-900
  },
};

const contentVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.04,
  },
};

const metricVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.15,
  },
};

export default function CaseStudies() {
  return (
    <section className="relative bg-[#160a1f] py-24">
      <div className="relative mx-auto max-w-360 px-6">
        <img
          src="/business/success.webp"
          alt=""
          className="pointer-events-none absolute right-0 top-0 opacity-60"
        />

        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-[45px] text-white">
            Real Case Studies,{" "}
            <span className="text-yellow-400">Real ROAS</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-20 bg-white" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group cardboxdb cardsticky1"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p className="metric-pera">
                30<span className="mertic-span">%</span>
              </p>
              <p className="metric-lead ">Qualified Lead</p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                Real Estate <br className="lg:hidden" /> Kolkata
              </h3>

              <p className="case-desc">
                Scaled Meta Ads for a real estate <br /> client from{" "}
                <span className="case-highlight">₹30K/month</span> with <br />
                <span className="case-highlight">
                  26% qualification
                </span> to <span className="case-highlight">₹4L/month</span>{" "}
                with <span className="case-highlight">30% qualified leads</span>{" "}
                through strategic targeting and optimization.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:relative w-full h-full group rounded-2xl cardboxdb cardsticky2 "
          >
            <motion.img
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              src="/business/real-case-studies.webp"
              alt=""
              className="img-position"
            />

            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="case-card group w-full h-full"
            >
              <motion.div
                variants={metricVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="metric-div"
              >
                <p className="metric-pera">4</p>
                <p className="metric-lead ">ROAS</p>
              </motion.div>

              <motion.div
                variants={contentVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                <h3 className="case-heading">
                  Dubai-based <br /> Copperware <br className="lg:hidden" />{" "}
                  Brand
                </h3>

                <p className="case-desc">
                  Increased sales by scaling from{" "}
                  <span className="case-highlight">3K AED</span> spend &
                  <br className="hidden lg:block" />
                  <span className="case-highlight">1.7 ROAS</span> to{" "}
                  <span className="case-highlight">12K AED</span> spend &{" "}
                  <span className="case-highlight">4 ROAS</span> using Meta &
                  Google Ads.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p className="metric-pera">
                54<span className="mertic-span">%</span>
              </p>
              <p className="metric-lead ">Quality Rate</p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                Laminate <br /> Manufacturer
              </h3>

              <p className="case-desc">
                Optimized Google & Meta for a laminates brand,{" "}
                <br className="hidden lg:block" /> improving{" "}
                <span className="case-highlight">₹20K+ qualified</span>{" "}
                leads/month at
                <span className="case-highlight">54% quality rate</span> and
                approximate revenue of{" "}
                <span className="case-highlight">1.5Cr/Month</span> over{" "}
                <span className="case-highlight">2+ years/-</span>
              </p>
            </motion.div>
          </motion.div>{" "}
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full h-full group rounded-2xl"
          >
            <motion.img
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              src="/business/performance-img.webp"
              alt=""
              className="img-position"
            />
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="case-card group"
            >
              <motion.div
                variants={metricVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="metric-div"
              >
                <p className="metric-pera">
                  20<span className="mertic-span">+</span>
                </p>
                <p className="metric-lead ">ROAS</p>
              </motion.div>

              <motion.div
                variants={contentVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                <h3 className="case-heading">
                  Interior Surface <br /> Solutions
                </h3>

                <p className="case-desc">
                  Launched and scaled a new wall panel & interior{" "}
                  <br className="hidden lg:block" /> brand's Ads spend from{" "}
                  <span className="case-highlight">5k to ₹3L/month</span> while
                  generating <span className="case-highlight">20+ ROAS</span> in{" "}
                  <span className="case-highlight">18 months</span> using meta
                  and Google Ads.
                </p>
              </motion.div>
            </motion.div>{" "}
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p className="metric-pera">
                2K<span className="mertic-span">+</span>
              </p>
              <p className="metric-lead ">Organic Clicks</p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                Silverware <br className="lg:hidden" /> Gifting & <br />{" "}
                Furniture
              </h3>

              <p className="case-desc">
                Ranked silver gifting brand on top{" "}
                <span className="case-highlight">SERP</span> for “Silver{" "}
                <br className="hidden lg:block" />
                Wedding Gift” & “Silver Furniture” with
                <span className="case-highlight">2K+</span> highly
                <br />
                relevant monthly organic clicks and improved page{" "}
                <br className="hidden lg:block" /> quality metrics in{" "}
                <span className="case-highlight">9 months</span>
              </p>
            </motion.div>
          </motion.div>{" "}
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p className="metric-pera">
                30<span className="mertic-span">%</span>
              </p>
              <p className="metric-lead ">Conversion</p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                Pipe <br className="lg:hidden" /> Manufacturer
              </h3>

              <p className="case-desc">
                For a hardware brand targeting international{" "}
                <br className="hidden lg:block" /> markets, we scaled leads from{" "}
                <span className="case-highlight">1 to 36 at ₹33K</span> spend
                via Meta Ads, achieving{" "}
                <span className="case-highlight">30% quality</span> conversion
                and <span className="case-highlight">₹30L+</span>in closures.
              </p>
            </motion.div>
          </motion.div>{" "}
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p
                style={{
                  WebkitTextStroke: "2px #ffaa17",
                  color: "#ffaa17",
                }}
                className="text-[35px] lg:text-[40px] font-bold"
              >
                USA
              </p>

              <p
                style={{
                  WebkitTextStroke: "2px var(--stroke)",
                  color: "var(--fill)",
                }}
                className="
    [--stroke:black] [--fill:black]
    group-hover:[--stroke:white]
    group-hover:[--fill:white]
    text-[35px] lg:text-[40px] font-black -mt-2 lg:-mt-3
    transition-all
  "
              >
                BRAND
              </p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                USA Based D2C <br /> Apparel & <br className="lg:hidden" />{" "}
                Fashion <br className="hidden lg:block" /> Brand
              </h3>

              <p className="case-desc">
                Scaled the clothing brand's Meta Ads in USA{" "}
                <br className="hidden lg:block" /> Market from{" "}
                <span className="case-highlight">$2K</span> Monthly spend &{" "}
                <span className="case-highlight">1.9 ROAS</span> to{" "}
                <span className="case-highlight">$5K</span>monthly spend &{" "}
                <span className="case-highlight">4.0 ROAS.</span>
              </p>
            </motion.div>
          </motion.div>{" "}
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full h-full group rounded-2xl"
          >
            <motion.img
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              src="/business/graph-img.webp"
              alt=""
              className="img-position"
            />
            <motion.div
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="case-card group"
            >
              <motion.div
                variants={metricVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="metric-div"
              >
                <p className="metric-pera">
                  1K<span className="mertic-span">+</span>
                </p>
                <p className="metric-lead ">Leads</p>
              </motion.div>

              <motion.div
                variants={contentVariants}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
              >
                <h3 className="case-heading">
                  Real Estate Delhi <br /> NCR
                </h3>

                <p className="case-desc">
                  Generated <span className="case-highlight">1000+</span>{" "}
                  monthly leads to at{" "}
                  <span className="case-highlight">₹250 CPL</span> for a Delhi
                  NCR real estate client through Meta & Google Ads, while
                  maintaining a <span className="case-highlight">30%</span>{" "}
                  qualification rate
                </p>
              </motion.div>
            </motion.div>{" "}
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="case-card group"
          >
            <motion.div
              variants={metricVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="metric-div"
            >
              <p
                style={{
                  WebkitTextStroke: "2px #ffaa17",
                  color: "#ffaa17",
                }}
                className="text-[35px] lg:text-[40px] font-bold"
              >
                ROAS
              </p>

              <p
                style={{
                  WebkitTextStroke: "2px var(--stroke)",
                  color: "var(--fill)",
                }}
                className="
    [--stroke:black] [--fill:black]
    group-hover:[--stroke:white]
    group-hover:[--fill:white]
    text-[35px] lg:text-[40px] font-black -mt-2 lg:-mt-3
    transition-all
  "
              >
                BOOST
              </p>
            </motion.div>

            <motion.div
              variants={contentVariants}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-10"
            >
              <h3 className="case-heading">
                Copperware <br /> Manufacturer
              </h3>

              <p className="case-desc">
                Scaled a copperware manufacturer's ad spend{" "}
                <br className="hidden lg:block" /> from{" "}
                <span className="case-highlight">₹30K to ₹6.5L</span> per month
                while boosting spend{" "}
                <span className="case-highlight">ROAS</span> from{" "}
                <span className="case-highlight">3.2 to 7.3</span>
                using Meta and Google Ads.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
