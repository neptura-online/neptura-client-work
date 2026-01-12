import { FaArrowUpLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import type { OpenFormProps } from "../../types/type";
import MobileHeroVideo from "./MobileHeroVideo";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import video from "/videos/bg.mp4";
import { STRICT_LENGTHS } from "../../utils/phoneLengths";

const HeroSectionVideoBG = ({ setOpenForm, setId }: OpenFormProps) => {
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
    const emailValid = validateEmail(formData.email);

    const body = {
      ...formData,
      email: emailValid ? formData.email : "",
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

    if (!phone) {
      setPhoneError("Please enter a mobile number");
    }

    if (phoneError) {
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
      industry: "",
      message: formData.message,
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

  const triggerButton = () => {
    setOpenForm(true);
    setId("book free landing page audit");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      <section className="hidden relative lg:flex w-full justify-center overflow-hidden pt-30 pb-10 bg-zinc-950 text-white">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800 via-zinc-900 to-yellow-600/90" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: "url('/business/banner.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <video
          src={video}
          className="absolute inset-0 h-full w-full object-fill"
          muted
          autoPlay
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-linear-to-br from-zinc-800/70 via-zinc-900/60 to-yellow-600/40" />

        <div className="container mx-auto py-auto flex max-w-370 flex-row items-start gap-12 py-2 lg:px-16 ">
          <div className="flex flex-col gap-6 w-1/2 z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              className="font-serif text-3xl font-semibold  md:text-5xl"
            >
              <span className="bg-linear-to-r from-yellow-400 to-(--yellow-emarketing) bg-clip-text text-transparent leading-[1.5em]">
                Spending Money On Ads And Still Losing Leads?
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.7 }}
              className="max-w-xl text-sm text-zinc-300 md:text-lg"
            >
              Your Landing Page Might Not Be Built For Conversion! Don’t Worry!
              We will help you identify the mistakes.
            </motion.p>

            <motion.button
              onClick={triggerButton}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.8 }}
              className="group mt-4 flex w-fit  items-center gap-4 rounded-2xl bg-(--yellow-emarketing) px-6 py-3 transition-all hover:scale-105   hover:cursor-pointer"
            >
              {" "}
              <span className="hidden lg:flex h-7 w-7 items-center justify-center rounded-full bg-black">
                <FaArrowUpLong className="rotate-45 text-md text-(--yellow-emarketing) transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
              <span className="text-left font-medium text-black text-md">
                Get Free Landing Page
              </span>
            </motion.button>
          </div>
          <div className="relative w-full flex md:w-1/2  justify-end">
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ease: "easeInOut", duration: 0.8 }}
              className="w-full max-w-105 rounded-3xl bg-white p-6 pb-12 text-black shadow-2xl text-center"
            >
              <h3 className="text-2xl font-extrabold font-serif leading-[1.5em]">
                Create <span className="text-yellow-500">Lead Capturing</span>{" "}
                <br />
                Landing Pages With Us!
              </h3>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-3"
              >
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
                {formError.name && (
                  <p className="text-sm text-start text-red-500 -mt-2">
                    {formError.name}
                  </p>
                )}

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none focus:border-yellow-500"
                />
                {formError.email && (
                  <p className="text-sm text-start text-red-500 -mt-2">
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
                  enableSearch
                  inputStyle={{
                    width: "100%",
                    height: "52px",
                    borderRadius: "12px",
                  }}
                />

                {phoneError && (
                  <p className="text-sm  text-red-500 -mt-2 text-start">
                    {phoneError}
                  </p>
                )}

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-yellow-500"
                  placeholder="Message"
                  minLength={10}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 rounded-2xl hover:bg-black py-3 text-base font-semibold hover:text-white transition bg-(--yellow-emarketing) text-black disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
                >
                  {loading ? "Loading..." : "Book A Free Consultation"}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <MobileHeroVideo setOpenForm={setOpenForm} setId={setId} />
    </>
  );
};

export default HeroSectionVideoBG;
