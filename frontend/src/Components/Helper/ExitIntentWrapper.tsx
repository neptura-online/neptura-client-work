import { useEffect, useRef, useState } from "react";
import Form from "./Form";

const ExitIntentWrapper = () => {
  const [showForm, setShowForm] = useState(false);
  const hasShownRef = useRef(false);

  useEffect(() => {
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownRef.current) {
        hasShownRef.current = true;
        setShowForm(true);
      }
    };

    document.addEventListener("mouseout", handleExitIntent);
    return () => document.removeEventListener("mouseout", handleExitIntent);
  }, []);

  return (
    <Form isOpen={showForm} onClose={() => setShowForm(false)} id="popup" />
  );
};

export default ExitIntentWrapper;
