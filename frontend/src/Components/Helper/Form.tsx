import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { FormProps } from "../../types/type";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { saveAs } from "file-saver";

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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

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

    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);

    errorTimeoutRef.current = setTimeout(() => {
      setError("");
    }, 3000);
  };

  function validateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    const digits = value.replace(/\D/g, "").replace(/^91/, "");

    if (digits.startsWith("0")) {
      setPhoneError("Mobile number cannot start with 0");
      return;
    }
    if (digits.length != 10) {
      setPhoneError("Mobile number should be 10");
      return;
    }

    setPhoneError("");
  };

  const partialSubmit = async () => {
    if (formData.name.length < 3) return;
    if (phone.length !== 12) return;

    const email = validateEmail(formData.email);
    formData.email = email ? formData.email : "";

    const rawPhone = phone.replace(/\D/g, "").slice(-10);

    if (rawPhone.length !== 10 || rawPhone.startsWith("0")) {
      return;
    }
    console.log(rawPhone);

    const body = {
      ...formData,
      phone: rawPhone,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: site,
      formID: id,
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
    if (formData.name && phone.length === 12) {
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
    const rawPhone = phone.replace(/\D/g, "").slice(-10);
    if (rawPhone.length !== 10 || rawPhone.startsWith("0")) {
      setPhoneError("Enter a valid 10-digit mobile number*");
    } else {
      setPhoneError("");
    }

    if (
      errors.name ||
      errors.email ||
      errors.industry ||
      rawPhone.length !== 10 ||
      rawPhone.startsWith("0")
    ) {
      setFormError(errors);
      return;
    }

    setFormError({ name: "", email: "", industry: "", message: "" });

    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: rawPhone,
      industry: e.target.industry.value,
      message: e.target.message.value,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      adgroupid: utm_adgroup,
      gclid,
      lpurl: site,
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
        window.location.href =
          triggered ?? "https://digital.e-marketing.io/thank-you/";
      }
    } catch (err: any) {
      showError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed left-1/2 top-1/2 z-1000 w-[92%] max-w-md max-h-[90vh] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 sm:p-8 shadow-2xl"
          >
            <button
              onClick={closeSubmit}
              className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg hover:scale-105 transition"
            >
              ✕
            </button>

            <h3 className="text-2xl font-extrabold font-serif leading-[1.5em] text-center">
              Create <span className="text-yellow-500">Lead Capturing </span>
              <br />
              Landing Pages With Us!
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input
                name="name"
                ref={firstInputRef}
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={handleChange}
                className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-yellow-500"
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
                className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-yellow-500"
              />
              {formError.email && (
                <p className="text-sm text-red-500 -mt-2">{formError.email}</p>
              )}

              <PhoneInput
                country="in"
                value={phone}
                onChange={handlePhoneChange}
                countryCodeEditable={false}
                autoFormat={true}
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
                className="rounded-2xl border border-zinc-300 px-4 py-3 text-sm sm:text-base outline-none focus:border-yellow-500"
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
                className="rounded-2xl border border-zinc-300 px-4 py-3 outline-none text-sm sm:text-base focus:border-yellow-500"
                placeholder="Message"
                maxLength={50}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-2xl bg-black py-3 text-base font-semibold text-white transition hover:bg-yellow-500 hover:text-black disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {loading ? "Loading..." : "Book A Free Consultation"}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Form;
