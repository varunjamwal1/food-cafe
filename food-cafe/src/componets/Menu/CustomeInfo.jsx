// src/components/Menu/CustomeInfo.jsx
import React from "react";
import { useSelector } from "react-redux";

const CustomeInfo = () => {
  const { customerName, tableNo, guests, orderId } = useSelector(
    (state) => state.customer
  );

  // Get initials for the floating button
  const getInitials = (name) => {
    if (!name) return "NA";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Current date/time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[var(--color-card)] p-2 rounded-sm flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold">{customerName || "Customer Name"}</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Table {tableNo || "N/A"} / {guests > 0 ? `${guests} guest${guests > 1 ? "s" : ""}` : "Dine In"} / Order ID: {orderId || "N/A"}
        </p>
        <p className="text-sm text-[var(--color-text-muted)]">{formattedDate}</p>
      </div>

      <button className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm">
        {getInitials(customerName)}
      </button>
    </div>
  );
};

export default CustomeInfo;
