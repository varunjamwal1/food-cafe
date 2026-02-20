import React, { useState } from "react";
import BottomNav from "../componets/BottomNav";
import OrderCard from "../componets/Order/OrderCard";
import BackButton from "../componets/Home/BackButtoon";

const ordersData = [
  { id: 1, number: 101, items: 10, status: "Preparing", total: 250.52 },
  { id: 2, number: 102, items: 4, status: "Ready", total: 120.0 },
  { id: 3, number: 103, items: 2, status: "Served", total: 80.99 },
  { id: 4, number: 104, items: 6, status: "Preparing", total: 310.1 },
  { id: 5, number: 105, items: 5, status: "Ready", total: 150.2 },
  { id: 6, number: 106, items: 8, status: "Preparing", total: 275.4 },
  { id: 7, number: 107, items: 3, status: "Served", total: 90.0 },
  { id: 8, number: 108, items: 9, status: "Ready", total: 330.0 },
  { id: 9, number: 109, items: 9, status: "Ready", total: 330.0 },
  { id: 10, number: 110, items: 9, status: "Ready", total: 330.0 },
];

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");

  const mapStatus = {
    inprogress: "Preparing",
    ready: "Ready",
    completed: "Served",
  };

  const filteredOrders =
    activeTab === "all"
      ? ordersData
      : ordersData.filter(
          (order) => order.status === mapStatus[activeTab]
        );

  return (
    <div className="h-[650px] flex flex-col bg-[var(--color-background)]">

      {/* HEADER */}
      <div className="p-4 pb-2 flex items-center justify-between">
        <BackButton />
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Orders
        </h1>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden gap-4 px-4">

        {/* LEFT SECTION - 80% */}
        <div className="flex-[0_0_80%] flex flex-col overflow-hidden">

          {/* TABS */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {["all", "inprogress", "ready", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-xl text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                }`}
              >
                {tab === "all" && "All"}
                {tab === "inprogress" && "In Progress"}
                {tab === "ready" && "Ready"}
                {tab === "completed" && "Completed"}
              </button>
            ))}
          </div>

          {/* SCROLLABLE ORDERS */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - 20% */}
        <div className="flex-[0_0_20%] bg-[var(--color-surface)] p-4 rounded-2xl shadow flex flex-col overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-[var(--color-text-primary)]">
            Order Summary
          </h2>
          <div className="flex-1 p-4 bg-[var(--color-card)] rounded-xl shadow">
            No items yet
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
};

export default Order;
