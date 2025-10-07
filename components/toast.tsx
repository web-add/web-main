import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type ToastType = "success" | "error" | "warning";

interface ToastProps {
  id: number;
  text: string;
  type: ToastType;
  duration: number;
  onClose: (id: number) => void;
}

const ToastItem: React.FC<ToastProps> = ({ id, text, type, duration, onClose }) => {
  const [state, setState] = useState<"entering" | "shown" | "exiting">("entering");

  useEffect(() => {
    // animate in
    const enterTimer = setTimeout(() => setState("shown"), 20);

    // after duration, animate out
    const exitTimer = setTimeout(() => {
      setState("exiting");
      setTimeout(() => onClose(id), 300); // wait exit anim
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [duration, id, onClose]);

  const typeStyles = {
    success: "bg-green-600 border-green-500 text-white",
    error: "bg-red-600 border-red-500 text-white",
    warning: "bg-yellow-500 border-yellow-400 text-black",
  }[type];

  return (
    <div
      className={`w-full max-w-sm p-4 rounded-xl shadow-2xl flex items-center space-x-3 border transform transition-all duration-300 ease-in-out ${typeStyles}
        ${state === "entering" ? "translate-x-full opacity-0" : ""}
        ${state === "shown" ? "translate-x-0 opacity-100" : ""}
        ${state === "exiting" ? "translate-x-full opacity-0" : ""}`}
    >
      <p className="text-sm font-medium">{text}</p>
      <button
        onClick={() => {
          setState("exiting");
          setTimeout(() => onClose(id), 300);
        }}
        className="ml-auto -mr-1 p-1.5 rounded-full hover:bg-black/30"
      >
        ✕
      </button>
    </div>
  );
};

// ---------- Manager ----------
let toastId = 0;
let addToast: ((text: string, type: ToastType, duration: number) => void) | null = null;

export function showToast(text: string, type: ToastType = "success", duration = 5000) {
  if (addToast) {
    addToast(text, type, duration);
  }
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<
    { id: number; text: string; type: ToastType; duration: number }[]
  >([]);

  useEffect(() => {
    addToast = (text, type, duration) => {
      const id = ++toastId;
      setToasts((prev) => [...prev, { id, text, type, duration }]);
    };
  }, []);

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return ReactDOM.createPortal(
    <div className="fixed top-4 right-4 space-y-3 z-50">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={handleClose} />
      ))}
    </div>,
    document.body
  );
};
