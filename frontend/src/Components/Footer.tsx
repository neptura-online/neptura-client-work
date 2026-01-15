import { FiMail, FiPhoneCall } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import { motion, AnimatePresence } from "framer-motion";

import "react-phone-input-2/lib/style.css";
import { STRICT_LENGTHS } from "../utils/phoneLengths";
import { useNavigate } from "react-router-dom";

const Footer = () => {
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
  const navigate = useNavigate();

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

    if (!formData.industry.trim()) {
      errors.industry = "Please enter industry*";
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
    const LPURL = window.location.href;
    const body = {
      name: formData.name,
      email: formData.email,
      phone: `+${phone}`,
      industry: formData.industry,
      message: formData.message,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: LPURL,
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
        navigate("/thankyou");
      }
    } catch (err: any) {
      showError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", industry: "", message: "" });
    }
  };

  const showError = (message: string) => {
    setError(message);

    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }

    errorTimeoutRef.current = setTimeout(() => {
      setError("");
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

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
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-black/10 bg-[#160a1f] pt-10 lg:pt-24 pb-10"
    >
      <div className="relative mx-auto max-w-350 px-6">
        <div className="mb-20 grid gap-16 lg:grid-cols-2">
          <div className="text-left">
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-[0.4em] text-(--yellow-emarketing)">
              Let’s Talk
            </span>

            <h2 className="mb-6 text-3xl  md:text-5xl font-medium uppercase tracking-tight text-white leading-[1.5em] font-serif">
              Let's work together.
              <br />
              <span className="bg-linear-to-r from-yellow-300 to-(--yellow-emarketing) bg-clip-text text-transparent">
                fixed a meeting
              </span>
            </h2>

            <div className="flex flex-col gap-4 mt-4 justify-start items-start">
              <div className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <LuMapPin size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  8/10, Shaheed Amit Bhardwaj Marg, Sector 8, Malviya Nagar,{" "}
                  <br />
                  Jaipur - 302017 (Raj)
                </a>
              </div>
              <div className=" flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <FiMail size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  cagarwal389@gmail.com
                </a>
              </div>
              <div className=" flex items-center justify-center gap-4 lg:justify-start">
                <div className="rounded-full border border-black/20 bg-(--yellow-emarketing) p-3 backdrop-blur">
                  <FiPhoneCall size={18} className="text-black" />
                </div>
                <a
                  href="mailto:hello@uxmotionz.studio"
                  className="text-base font-semibold text-white transition hover:text-(--yellow-emarketing)"
                >
                  +91-8239999732
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white text-black p-4 sm:p-10 backdrop-blur">
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
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                <div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name*"
                    className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing) w-full"
                  />
                  {formError.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {formError.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email*"
                    className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing) w-full"
                  />
                  {formError.email && (
                    <p className="text-sm mt-1 text-red-500">
                      {formError.email}
                    </p>
                  )}
                </div>
              </div>

              <PhoneInput
                country="in"
                value={phone}
                onChange={handlePhoneChange}
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
                <p className="text-sm text-red-500 -mt-2">{phoneError}</p>
              )}

              <input
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry*"
                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none focus:border-(--yellow-emarketing)"
              />
              {formError.industry && (
                <p className="text-sm text-red-500 -mt-2">
                  {formError.industry}
                </p>
              )}
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="rounded-xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-(--yellow-emarketing)"
                placeholder="Message"
                maxLength={50}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-xl bg-black disabled:cursor-not-allowed disabled:bg-gray-600 py-4 text-lg font-semibold text-white hover:text-black transition hover:bg-(--yellow-emarketing) hover:cursor-pointer"
              >
                Book A Free Consultation
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/90 pt-6 md:flex-row">
          <p className="text-xs text-white/90">
            Copyright © {new Date().getFullYear()} | Powered by JAI MARKETING.
          </p>
          <div className="flex gap-6 text-xs text-white/90">
            <a
              href="https://www.e-marketing.io/privacy-policy/"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.e-marketing.io/disclaimer/"
              className="transition hover:text-white"
            >
              Disclaimer
            </a>
            <a
              href="https://www.e-marketing.io/terms-of-use/"
              className="transition hover:text-white"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
