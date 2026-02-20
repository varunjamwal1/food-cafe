import React, { useState } from "react";
import Metrics from "../componets/Dashboard/Metrics";
import RecentOrders from "../componets/Dashboard/RecentOredrs";
import AddTableModal from "../componets/Dashboard/Modal";
import { AnimatePresence } from "framer-motion";

// API
import { createTable } from "../https/index";

export default function Dashboard() {

  const [activeTab, setActiveTab] = useState("metrics");
  const [modalType, setModalType] = useState(null);

  // prevent double opening
  const openModal = (type) => {
    if (modalType) return;
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  // send table data to backend
  const handleAddTable = async (data) => {
    try {
      console.log("Sending table:", data);
      const res = await createTable(data);
      console.log("Server response:", res.data);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const actions = [
    { label: "Add Table", type: "table" },
    { label: "Add Category", type: "category" },
    { label: "Add Dishes", type: "dishes" },
  ];

  const tabs = ["metrics", "orders", "payments"];

  return (
    <div className="w-full min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] px-6 py-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-4 mb-6 md:flex-row md:items-center md:justify-between">

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => openModal(a.type)}
              className="px-4 py-2 rounded-lg bg-[var(--color-card)] hover:bg-[var(--color-primary)] hover:text-black transition font-medium"
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative capitalize font-medium pb-2 transition ${
                activeTab === tab
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-[var(--color-primary)] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full">
        {activeTab === "metrics" && <Metrics />}
        {activeTab === "orders" && <RecentOrders />}
        {activeTab === "payments" && (
          <div className="text-[var(--color-text-muted)]">Payments coming soon...</div>
        )}
      </div>

      {/* MODALS (IMPORTANT FIX) */}
      <AnimatePresence mode="wait">
        {modalType === "table" && (
          <AddTableModal
            key="table-modal"
            onClose={closeModal}
            onAddTable={handleAddTable}
          />
        )}
      </AnimatePresence>

    </div>
  );
}