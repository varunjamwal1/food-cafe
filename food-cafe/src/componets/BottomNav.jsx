import React, { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaUtensils,
  FaEllipsisH,
  FaBell,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(0);

  const isOnTablesPage = location.pathname === "/tables";

  const openModal = () => {
    if (isOnTablesPage) return;
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName("");
    setPhone("");
    setGuests(0);
  };

  const incrementGuests = () => setGuests((prev) => prev + 1);
  const decrementGuests = () =>
    setGuests((prev) => (prev > 0 ? prev - 1 : 0));

  const isValid =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    guests > 0 &&
    !isOnTablesPage;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // ✅ Save to Redux
    dispatch(
      setCustomer({
        name,
        phone,
        guests,
      })
    );

    // ✅ Navigate
    navigate("/tables");

    // ✅ Close modal & reset
    closeModal();
  };

  return (
    <>
      {/* Bottom Nav */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[95%] sm:w-[420px] lg:w-[520px] z-[9999] pointer-events-none">
        <div className="relative bg-[var(--color-surface)]/90 backdrop-blur-md text-[var(--color-text-primary)] rounded-2xl shadow-2xl px-6 py-3 flex justify-between items-center pointer-events-auto">

          <button
            className="flex flex-col items-center hover:text-[var(--color-primary)]"
            onClick={() => navigate("/")}
          >
            <FaHome className="text-lg mb-1" />
            <span className="text-[11px]">Home</span>
          </button>

          <button
            className="flex flex-col items-center hover:text-[var(--color-primary)]"
            onClick={() => navigate("/orders")}
          >
            <FaClipboardList className="text-lg mb-1" />
            <span className="text-[11px]">Orders</span>
          </button>

          <div className="w-16" />

          <button
            className="flex flex-col items-center hover:text-[var(--color-primary)]"
            onClick={() => navigate("/tables")}
          >
            <FaUtensils className="text-lg mb-1" />
            <span className="text-[11px]">Tables</span>
          </button>

          <button
            className="flex flex-col items-center hover:text-[var(--color-primary)]"
            onClick={() => navigate("/more")}
          >
            <FaEllipsisH className="text-lg mb-1" />
            <span className="text-[11px]">More</span>
          </button>

          {/* Floating Button */}
          <button
            onClick={openModal}
            disabled={isOnTablesPage}
            className={`absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full text-black flex items-center justify-center shadow-xl border-[5px] border-[var(--color-surface)] transition
            ${
              isOnTablesPage
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-[var(--color-warning)] hover:scale-110 active:scale-95"
            }`}
          >
            <FaBell className="text-xl" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              className="border border-[var(--color-border)] rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9999999999"
              className="border border-[var(--color-border)] rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Guests</label>
            <button
              type="button"
              onClick={decrementGuests}
              className="px-3 py-1 bg-[var(--color-danger)] text-white rounded-[5px]"
            >
              -
            </button>
            <span>
              {guests} person{guests !== 1 && "s"}
            </span>
            <button
              type="button"
              onClick={incrementGuests}
              className="px-3 py-1 bg-[var(--color-success)] text-white rounded-[5px]"
            >
              +
            </button>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`rounded-[5px] px-4 py-2 mt-2 transition text-white
              ${
                isValid
                  ? "bg-[var(--color-primary)] hover:opacity-90"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            Create Order
          </button>
        </form>
      </Modal>
    </>
  );
};

export default BottomNav;
