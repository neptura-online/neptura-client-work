import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type LeadFormMode = "partial" | "simple" | "business";

interface UseLeadFormProps {
  formID: string;
  mode: LeadFormMode;
  redirect?: string;
}

export function useLeadForm({
  formID,
  mode,
  redirect = "/thankyou",
}: UseLeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasSubmittedRef = useRef(false);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const site = window.location.href;

  /* ---------------- helpers ---------------- */

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 3000);
  };

  /* ---------------- validation ---------------- */

  const validate = (): string | null => {
    if (formData.name.trim().length < 3) {
      return "Please enter a valid name";
    }

    // PARTIAL: email OR phone
    if (mode === "partial") {
      const hasEmail = validateEmail(formData.email);
      const hasPhone = phone.length > 5;
      if (!hasEmail && !hasPhone) {
        return "Email or phone is required";
      }
      return null;
    }

    // SIMPLE & BUSINESS
    if (!validateEmail(formData.email)) {
      return "Please enter a valid email";
    }

    if (!phone) {
      return "Please enter a mobile number";
    }

    if (mode === "business" && !formData.industry.trim()) {
      return "Please enter industry";
    }

    return null;
  };

  /* ---------------- partial submit ---------------- */

  const partialSubmit = async () => {
    if (mode !== "partial") return;
    if (hasSubmittedRef.current) return;

    const error = validate();
    if (error) return;

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partiallead`, {
        ...formData,
        phone: phone ? `+${phone}` : "-",
        industry: formData.industry || "-",
        lpurl: site,
        formID,
      });
      hasSubmittedRef.current = true;
    } catch {
      // silent fail (by design)
    }
  };

  /* ---------------- final submit ---------------- */

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      showError(error);
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/lead`, {
        ...formData,
        phone: `+${phone}`,
        industry: formData.industry || "-",
        lpurl: site,
        formID,
      });

      hasSubmittedRef.current = true;
      localStorage.setItem("name", formData.name);
      navigate(redirect);
    } catch (err: any) {
      showError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- lifecycle ---------------- */

  useEffect(() => {
    const handleUnload = () => partialSubmit();
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") partialSubmit();
    };

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [formData, phone]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  /* ---------------- public API ---------------- */

  return {
    formData,
    setFormData,
    phone,
    setPhone,
    loading,
    error,
    handleSubmit,
  };
}
