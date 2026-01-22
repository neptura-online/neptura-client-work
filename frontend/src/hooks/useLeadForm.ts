import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { STRICT_LENGTHS } from "../utils/phoneLengths";
import { saveAs } from "file-saver";

type LeadFormMode = "simple" | "business";

interface UseLeadFormProps {
  formID: string;
  mode: LeadFormMode;
  redirect?: string;
  save?: string;
}

export function useLeadForm({
  formID,
  mode,
  redirect = "/thankyou",
  save,
}: UseLeadFormProps) {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasPartialSubmittedRef = useRef(false);
  const hasFinalSubmittedRef = useRef(false);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const site = window.location.href;

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const showError = (msg: string) => {
    setError(msg);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    errorTimeoutRef.current = setTimeout(() => setError(""), 3000);
  };

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
      setPhoneError("Mobile number must be valid");
      return;
    }

    if (strictLength && nationalNumber.length !== strictLength) {
      setPhoneError(`Mobile number must be ${strictLength} digits`);
      return;
    }

    setPhoneError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setFormError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const canSubmitPartial = () => {
    if (formData.name.length < 3) return false;
    if (!phone && !formData.email) return false;

    const emailValid = validateEmail(formData.email);
    if (phoneError && !emailValid) return false;

    return true;
  };

  const validateFinal = (): boolean => {
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

    if (mode === "business" && !formData.industry.trim()) {
      errors.industry = "Please enter industry*";
    }

    setFormError(errors);

    return !(errors.name || errors.email || errors.industry || phoneError);
  };

  const partialSubmit = async () => {
    if (hasPartialSubmittedRef.current) return;
    if (!canSubmitPartial()) return;

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/partiallead`, {
        ...formData,
        email: validateEmail(formData.email) ? formData.email : "",
        phone: phone ? `+${phone}` : "-",
        industry: formData.industry || "-",
        lpurl: site,
        formID,
      });
      hasPartialSubmittedRef.current = true;
    } catch {}
  };

  const handleSubmit = async () => {
    if (hasFinalSubmittedRef.current) return;

    if (!validateFinal()) return;

    try {
      setLoading(true);
      hasFinalSubmittedRef.current = true;

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/lead`, {
        ...formData,
        phone: `+${phone}`,
        industry: formData.industry || "-",
        lpurl: site,
        formID,
      });

      localStorage.setItem("name", formData.name);
      save && saveAs(save);
      navigate(redirect);
      return true;
    } catch (err: any) {
      hasFinalSubmittedRef.current = false;
      showError(err?.response?.data || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleUnload = () => partialSubmit();
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        partialSubmit();
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [formData, phone, phoneError]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  return {
    formData,
    setFormData,
    formError,
    phone,
    phoneError,
    handlePhoneChange,
    handleChange,
    setPhone,
    loading,
    error,
    handleSubmit,
    partialSubmit,
  };
}
