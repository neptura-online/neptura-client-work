import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import type { FormProps } from "../../types/type";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLeadForm } from "../../hooks/useLeadForm";

const Form = ({ isOpen, onClose, id, triggered, save }: FormProps) => {
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const {
    formData,
    setFormData,
    formError,
    phone,
    phoneError,
    handlePhoneChange,
    handleChange,
    loading,
    error,
    handleSubmit,
    partialSubmit,
  } = useLeadForm({
    formID: id,
    mode: "business",
    redirect: triggered,
    save: save,
  });

  const closeSubmit = async () => {
    if (formData.name) {
      await partialSubmit();
    }
    onClose();
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

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      onClose();
    }
  };

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

            <form
              onSubmit={handleFormSubmit}
              className="mt-4 flex flex-col gap-4"
            >
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
