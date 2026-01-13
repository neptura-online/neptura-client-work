import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { STRICT_LENGTHS } from "../utils/phoneLengths";
import { useNavigate } from "react-router-dom";

export default function FinalCTASection() {
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
        navigate("/thankyou");
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
    <section className="bg-zinc-100 pt-10 lg:pt-20">
      <div className="mx-auto max-w-350 px-3 lg:px-6 pb-10">
        <div className="flex justify-between flex-col xl:flex-row w-full gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="xl:w-[55%] flex items-center xl:items-start flex-col"
          >
            <h2 className="font-serif text-3xl font-semibold md:text-4xl text-center lg:text-start px-6 lg:px-0">
              Time to Stop Losing Business to Competitors!
            </h2>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <p className="mt-6 text-lg text-zinc-700">
              Start with our <span className="font-semibold">FREE Audit</span>
            </p>

            <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-yellow-50 px-4 py-2 text-sm text-yellow-700 w-fit">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              We guarantee a
            </span>

            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 min-w-80 sm:min-w-170 lg:min-w-200">
              <div className="overflow-hidden rounded-3xl bg-linear-to-br p-8 text-black bg-[url('/business/donut.webp')] h-fit ">
                <div className="text-6xl font-extrabold">15%</div>
                <div className="mt-2 text-xl font-semibold">ROAS</div>
                <p className="mt-1 text-sm opacity-80">improvement</p>
              </div>

              <div className="overflow-hidden rounded-3xl bg-linear-to-br from-pink-200 via-pink-300 to-rose-300 p-8 text-black bg-[url('/business/graph.webp')]">
                <h3 className="text-3xl font-bold leading-tight">
                  Custom <br /> Strategy
                </h3>
                <p className="mt-2 text-sm opacity-80">
                  for your business growth
                </p>
              </div>
            </div>
          </motion.div>
          {/* form started */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-8 shadow-xl xl:w-[40%]"
          >
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
            <h3 className="font-serif text-2xl lg:text-[34px] font-semibold">
              Fill The Form, Let’s Talk Growth.
            </h3>

            <div className="mt-4 h-0.5 w-24 bg-black" />

            <form onSubmit={handleSubmit} className=" mt-4 lg:mt-8 space-y-4">
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
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
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              {formError.email && (
                <p className="text-sm text-red-500 -mt-2">{formError.email}</p>
              )}
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
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry*"
                className="w-full rounded-lg border px-4 py-3 outline-none border-gray-400 placeholder:text-gray-400"
              />
              {formError.industry && (
                <p className="text-sm text-red-500 -mt-2">
                  {formError.industry}
                </p>
              )}
              <button
                type="submit"
                className="mt-3 lg:mt-6 w-full rounded-lg bg-black py-3 text-base lg:text-lg font-semibold text-white transition hover:bg-zinc-900 hover:cursor-pointer"
              >
                {loading ? "Loading..." : "Get Your FREE Audit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* footer started */}
      <div className=" bg-[#1A1421] py-4 flex justify-center w-screen ">
        <div className="w-full max-w-340 flex flex-col items-center justify-between gap-4 xl:flex-row">
          <p className="text-xs sm:text-sm text-white/90">
            Copyright © {new Date().getFullYear()} | Powered by JAI MARKETING.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm text-white/90">
            <a
              href="https://www.e-marketing.io/privacy-policy/"
              className="transition hover:text-yellow-emarketing"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.e-marketing.io/disclaimer/"
              className="transition hover:text-yellow-emarketing"
            >
              Disclaimer
            </a>
            <a
              href="https://www.e-marketing.io/terms-of-use/"
              className="transition hover:text-yellow-emarketing"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
