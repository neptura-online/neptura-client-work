import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import type { OpenFormProps } from "../types/type";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { STRICT_LENGTHS } from "../utils/phoneLengths";

const HeroSection = ({ setOpenForm, setId }: OpenFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const hasSubmittedRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [error, setError] = useState("");
  const site = window.location.href;
  const url = new URL(site);
  const params = new URLSearchParams(url.search);
  const utm_source = params.get("utm_source") || "direct";
  const utm_medium = params.get("utm_medium");
  const utm_term = params.get("utm_term");
  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");
  const utm_adgroup = params.get("adgroupid");
  const gclid = params.get("gclid");

  const showError = (message: string) => {
    setError(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = setTimeout(() => {
      setError("");
    }, 3000);
  };

  function validateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  const handlePhoneChange = (value: string, country: any) => {
    setPhone(value);
    if (!value || !country) {
      setPhoneError("Mobile number is required");
      return;
    }

    const countryIso = country.countryCode;
    const dialCode = country.dialCode;

    const strictLength = STRICT_LENGTHS[countryIso];

    const nationalNumber = value.slice(dialCode.length);

    if (!/^\d+$/.test(nationalNumber)) {
      setPhoneError("Mobile number must contain only digits");
      return;
    }
    if (nationalNumber.length < 5) {
      setPhoneError(`Mobile number must be valid`);
      return;
    }

    if (strictLength && nationalNumber.length !== strictLength) {
      setPhoneError(`Mobile number must be ${strictLength} digits`);
      return;
    }

    setPhoneError("");
  };

  const partialSubmit = async () => {
    if (hasSubmittedRef.current) return;
    if (formData.name.length < 3) return;
    if (!phone || phoneError) return;
    const email = validateEmail(formData.email);
    if (!email) {
      formData.email = "";
    }

    const body = {
      ...formData,
      phone: `+${phone}`,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: site,
      formID: "hero",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/partiallead`,
        body,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {}
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {
      name: "",
      email: "",
      industry: "",
      message: "",
    };

    if (!formData.name.trim()) {
      errors.name = "Please enter name*";
    }

    if (!formData.email.trim()) {
      errors.email = "Please enter email*";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Enter a valid email address*";
    }

    if (!formData.industry.trim()) {
      errors.industry = "Please enter industry*";
    }

    if (!phone) {
      setPhoneError("Please enter valid number");
      return;
    }

    if (errors.name || errors.email || errors.industry || phoneError) {
      setFormError(errors);
      return;
    }
    setPhoneError("");

    setFormError({ name: "", email: "", industry: "", message: "" });

    const body = {
      name: formData.name,
      email: formData.email,
      phone: `+${phone}`,
      industry: formData.industry,
      message: " ",
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: site,
      formID: "hero",
    };

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/lead`,
        body
      );

      if (res.status === 200 || res.status === 201) {
        hasSubmittedRef.current = true;
        window.location.href = "https://digital.e-marketing.io/thank-you/";
      }
    } catch (err: any) {
      showError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", industry: "", message: "" });
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      partialSubmit();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        partialSubmit();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [formData.name, phone]);

  const handleClick = () => {
    setOpenForm(true);
    setId("hero lets work together");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 text-white flex justify-center">
      <div className="absolute inset-0 bg-linear-to-br lg:bg-linear-to-r from-zinc-800 via-zinc-900 to-yellow-600/90" />

      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: "url('/business/banner.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-390">
        {/* right part */}
        <div className="relative z-10 flex  items-center justify-between px-3 py-2 lg:px-16">
          <div className="flex items-center gap-2">
            <img
              src="/assets/logowhite.webp"
              alt="Logo"
              className="h-15 md:h-20 w-auto"
              loading="lazy"
            />
          </div>

          <div className="items-center gap-4 flex">
            <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-base">
              <FaEnvelope />
              Email ID@e-marketing.io
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-(--yellow-emarketing) px-4 py-3 text-sm lg:text-base text-black">
              <FiPhone />
              +91-9602694444
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto md:mx-4 flex gap-12 py-6 flex-col lg:flex-row justify-between lg:px-16 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-start lg:w-[80%] px-6"
          >
            <h1 className="text-[35px] font-serif font-medium leading-tight md:text-[45px] ">
              Get More Leads. Close More Sales.
            </h1>

            <div className="mt-8 h-0.5 w-16 bg-white" />

            <h2 className="mt-8 text-2xl font-serif font-semibold md:text-[35px]">
              Grow Your{" "}
              <span className="text-(--yellow-emarketing)">
                B2B Business | B2C Business
              </span>
            </h2>

            <p className="my-8 text-xl  md:text-2xl text-zinc-300">
              We have helped clients generate{" "}
              <span className="font-semibold text-white">₹25+ Crores</span> in
              revenue!
            </p>

            <div className="mt-6 inline-flex items-start md:items-center gap-2 rounded-xl bg-white px-5 py-2 text-xl font-medium text-black w-fit">
              <span className="min-h-2 min-w-2 rounded-full bg-black mt-2 md:mt-0" />
              <span>
                Get Guaranteed <strong>15% ROAS</strong> Improvement with us.
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2 md:gap-4">
              <img
                src="/business/meta.webp"
                alt="Meta"
                className="h-8 lg:h-16 rounded-sm"
              />
              <img
                src="/business/google.webp"
                alt="Google"
                className="h-8 lg:h-16 rounded-sm"
              />
              <img
                src="/business/whatsapp.webp"
                alt="WhatsApp"
                className="h-8 lg:h-16 rounded-sm"
              />
            </div>

            <button
              onClick={handleClick}
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm transition hover:bg-white hover:text-black"
            >
              Let’s Grow Together
              <FiArrowRight className="transition group-hover:translate-x-1" />
            </button>
          </motion.div>
          {/* form part */}
          <div className="flex justify-center lg:justify-end px-2">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="
                  fixed z-70
                  top-4 sm:top-10 left-1/2 -translate-x-1/2
                  sm:left-1/2
                  w-[90%] sm:w-auto
                  max-w-sm
                  rounded-xl
                  bg-red-50
                  border border-red-200
                  px-4 py-3
                  shadow-lg
                "
                >
                  <p className="text-sm sm:text-base font-medium text-red-600 text-center sm:text-left">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-full lg:max-w-md rounded-3xl bg-white p-6 text-black shadow-2xl h-fit">
              <h3 className="text-[22px] lg:text-[27px] font-semibold font-serif">
                Let’s Get Started With a{" "}
                <span className="font-extrabold">FREE</span> Business Audit
                Worth <span className="font-extrabold">15,000</span> Today!
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                {formError.name && (
                  <p className="text-sm text-red-500 -mt-2">{formError.name}</p>
                )}
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                {formError.email && (
                  <p className="text-sm text-red-500 -mt-2">
                    {formError.email}
                  </p>
                )}
                <PhoneInput
                  country="in"
                  value={phone}
                  onChange={(value, country) =>
                    handlePhoneChange(value, country)
                  }
                  countryCodeEditable={false}
                  autoFormat={false}
                  inputStyle={{
                    width: "100%",
                    height: "52px",
                    borderRadius: "12px",
                  }}
                />

                {phoneError && (
                  <p className="text-sm text-red-500 -mt-2">{phoneError}</p>
                )}
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="Industry*"
                  className="w-full rounded-lg border border-gray-400 placeholder:text-gray-400 px-4 py-3 outline-none"
                />
                {formError.industry && (
                  <p className="text-sm text-red-500 -mt-2">
                    {formError.industry}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-black py-3 text-lg font-semibold text-white transition hover:bg-zinc-900"
                >
                  {loading ? "Loading..." : "Get Your FREE Audit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
