import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function AddTableModal({ onClose, onAddTable }) {
  const [tableNo, setTableNo] = useState("");
  const [seats, setSeats] = useState(2);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const alertColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  // Close on ESC + lock scroll
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 2500);
  };

  const handleSubmit = async () => {
    if (!tableNo || Number(tableNo) <= 0)
      return showAlert("warning", "Enter valid table number");

    try {
      setLoading(true);
      await onAddTable({ tableNo: Number(tableNo), seats: Number(seats) });
      showAlert("success", "Table Added Successfully");
      setTimeout(onClose, 900);
    } catch (err) {
      showAlert("error", err?.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="w-full max-w-md rounded-3xl p-7 shadow-[0_25px_70px_rgba(0,0,0,0.6)] border relative bg-[var(--color-card)]"
        style={{ borderColor: "var(--color-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-[var(--color-text-muted)] hover:text-red-400 transition"
        >
          <IoClose />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-semibold tracking-wide text-[var(--color-primary)] mb-6">
          Add New Table
        </h2>

        {/* ALERT */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-white text-sm px-4 py-2 mb-4 rounded-lg shadow ${alertColor[alert.type]}`}
          >
            {alert.message}
          </motion.div>
        )}

        {/* TABLE NUMBER INPUT */}
        <div className="mb-5">
          <label className="text-sm text-[var(--color-text-muted)] block mb-1">
            Table Number
          </label>
          <input
            type="number"
            placeholder="e.g. 12"
            value={tableNo}
            onChange={(e) => setTableNo(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border bg-[var(--color-surface)] outline-none
            focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]
            transition"
          />
        </div>

        {/* SEAT STEPPER */}
        <div className="mb-6">
          <label className="text-sm text-[var(--color-text-muted)] block mb-2">
            Seats
          </label>

          <div className="flex items-center justify-between bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3 py-2">
            <button
              onClick={() => setSeats((s) => Math.max(1, s - 1))}
              className="w-10 h-10 rounded-lg bg-red-500/80 hover:bg-red-500 active:scale-95 transition text-white text-lg font-bold"
            >
              −
            </button>

            <span className="text-xl font-semibold tracking-wide">{seats}</span>

            <button
              onClick={() => setSeats((s) => s + 1)}
              className="w-10 h-10 rounded-lg bg-green-500/80 hover:bg-green-500 active:scale-95 transition text-white text-lg font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold tracking-wide transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[var(--color-primary)] hover:brightness-110 active:scale-[0.98]"
          } text-black`}
        >
          {loading ? "Adding Table..." : "Add Table"}
        </button>
      </motion.div>
    </motion.div>
  );
}