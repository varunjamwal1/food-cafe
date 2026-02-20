import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: 1,
  });

  if (!isOpen) return null;

  const isValid =
    form.name.trim() !== "" &&
    form.phone.trim().length >= 10 &&
    form.guests > 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const incrementGuests = () =>
    setForm({ ...form, guests: form.guests + 1 });

  const decrementGuests = () =>
    setForm({ ...form, guests: Math.max(1, form.guests - 1) });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // 🔥 Store customer in Redux
    dispatch(
      setCustomer({
        name: form.name,
        phone: form.phone,
        guests: Number(form.guests),
      })
    );

    onClose();
    navigate("/tables");
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_.2s_ease]">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-[var(--color-primary)]">
            {title || "Create Order"}
          </h2>

          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-danger)] text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">

          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-[var(--color-text-secondary)]">
              Customer Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-[var(--color-text-secondary)]">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 9999999999"
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {/* GUESTS */}
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-text-secondary)]">Guests</span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrementGuests}
                className="px-3 py-1 rounded-md bg-[var(--color-danger)] text-white"
              >
                −
              </button>

              <span className="min-w-[40px] text-center font-semibold">
                {form.guests}
              </span>

              <button
                type="button"
                onClick={incrementGuests}
                className="px-3 py-1 rounded-md bg-[var(--color-success)] text-white"
              >
                +
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!isValid}
            className={`mt-2 py-2 rounded-md font-semibold transition
              ${
                isValid
                  ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-black"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            Create Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;