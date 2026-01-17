import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormProps } from "../../types/type";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { saveAs } from "file-saver";
import { STRICT_LENGTHS } from "../../utils/phoneLengths";
import { useNavigate } from "react-router-dom";

const Form = ({ isOpen, onClose, id, triggered, save }: FormProps) => {
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
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasSubmittedRef = useRef(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const site = window.location.href;
  const url = new URL(site);
  const params = new URLSearchParams(url.search);
  const navigate = useNavigate();
  const utm_source = params.get("utm_source") || "direct";
  const utm_medium = params.get("utm_medium");
  const utm_term = params.get("utm_term");
  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");
  const utm_adgroup = params.get("adgroupid");
  const gclid = params.get("gclid");

  const showError = (message: string) => {
    setError(message);

    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

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
    if (!phone && !formData.email) return;
    const emailValid = validateEmail(formData.email);
    if (phoneError && !emailValid) return;

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

  const closeSubmit = async () => {
    if (formData.name) {
      await partialSubmit();
    }
    onClose();
  };

  const handleSubmit = async (e: any) => {
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

    setFormError({ name: "", email: "", industry: "", message: "" });
    setPhoneError("");
    const LPURL = window.location.href;
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: `+${phone}`,
      industry: e.target.industry.value,
      message: e.target.message.value,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: LPURL,
      formID: id,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/lead`,
        body
      );

      if (res.status === 200 || res.status === 201) {
        save && saveAs(save);
      }

      if (res.status === 200 || res.status === 201) {
        hasSubmittedRef.current = true;
        localStorage.setItem("name", formData.name);
        if (triggered) {
          window.location.href = triggered;
        } else {
          navigate("/thankyou");
        }
      }
    } catch (err: any) {
      showError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
      setFormData({ name: "", email: "", industry: "", message: "" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 200);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
  }, [formData.name, phone, formData.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            onClick={closeSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="fixed z-70 top-4 sm:top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm rounded-xl bg-red-50 border border-red-200 px-4 py-3 shadow-lg"
              >
                <p className="text-sm sm:text-base font-medium text-red-600 text-center">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-60 w-[94%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white px-4 py-6 shadow-2xl"
          >
            <button
              onClick={closeSubmit}
              className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg hover:scale-105 transition hover:cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl sm:text-[25px] font-serif font-bold text-center">
              Let’s Get Started With a FREE Business
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              <input
                name="name"
                ref={firstInputRef}
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                className="rounded-xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
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
                className="rounded-xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
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
                name="industry"
                type="text"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Industry*"
                className="rounded-xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
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
                className="rounded-xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-black"
                placeholder="Message"
                maxLength={50}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-xl bg-black py-3 text-base font-semibold text-white transition hover:bg-zinc-900 disabled:opacity-70 hover:cursor-pointer"
              >
                {loading ? "Submitting..." : "Get Your FREE Audit"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Form;
