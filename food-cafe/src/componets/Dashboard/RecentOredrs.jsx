import React, { useState } from "react";
import { TbRefresh } from "react-icons/tb";

const initialOrders = [
  { id: "ORD-201", customer: "Amit", status: "In Progress", datetime: "20 Feb 2026, 7:10 PM", items: "Paneer Tikka x2", table: "T1", total: "₹520" },
  { id: "ORD-202", customer: "Riya", status: "Ready", datetime: "20 Feb 2026, 7:12 PM", items: "Veg Biryani", table: "T3", total: "₹280" },
  { id: "ORD-203", customer: "Karan", status: "In Progress", datetime: "20 Feb 2026, 7:14 PM", items: "Burger + Coke", table: "T4", total: "₹350" },
  { id: "ORD-204", customer: "Neha", status: "Ready", datetime: "20 Feb 2026, 7:16 PM", items: "Masala Dosa x3", table: "T2", total: "₹420" },
];

export default function RecentOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [refreshing, setRefreshing] = useState(false);

  const updateStatus = (index, value) => {
    const updated = [...orders];
    updated[index].status = value;
    setOrders(updated);
  };

  const refreshOrders = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
    setOrders([...orders]);
  };

  const statusStyle = (status) =>
    status === "Ready"
      ? "bg-[var(--color-success)]/20 text-[var(--color-success)] border-[var(--color-success)]/30"
      : "bg-[var(--color-warning)]/20 text-[var(--color-warning)] border-[var(--color-warning)]/30";

  return (
    <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold tracking-wide">Recent Orders</h2>
        <button
          aria-label="Refresh orders"
          onClick={refreshOrders}
          className="p-2 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-black transition"
        >
          <TbRefresh className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-[var(--color-text-secondary)] border-b border-[var(--color-border)]">
            <tr>
              <th className="py-3">Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Table No</th>
              <th>Total</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-card)]/60 transition">
                <td className="py-3 font-medium text-[var(--color-primary)]">{order.id}</td>
                <td className="text-[var(--color-text-primary)]">{order.customer}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                    className={`rounded-md px-2 py-1 text-xs border ${statusStyle(order.status)} bg-transparent focus:outline-none`}
                  >
                    <option value="Ready">Ready</option>
                    <option value="In Progress">In Progress</option>
                  </select>
                </td>
                <td className="text-[var(--color-text-muted)]">{order.datetime}</td>
                <td className="max-w-[220px] truncate text-[var(--color-text-secondary)]">{order.items}</td>
                <td className="font-medium">{order.table}</td>
                <td className="font-semibold text-[var(--color-primary)]">{order.total}</td>
                <td className="text-right">
                  <button
                    aria-label={`Refresh ${order.id}`}
                    onClick={refreshOrders}
                    className="inline-flex items-center justify-center text-[var(--color-info)] hover:text-[var(--color-primary)] transition"
                  >
                    <TbRefresh className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}