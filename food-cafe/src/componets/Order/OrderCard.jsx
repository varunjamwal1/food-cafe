import React from "react";
import { FaUtensils, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";

/* STATUS COLOR */
const statusStyle = (status) => {
  switch (status) {
    case "Ready":
      return "bg-success/15 text-success border-success/40";
    case "Served":
      return "bg-info/15 text-info border-info/40";
    default:
      return "bg-warning/15 text-warning border-warning/40";
  }
};

const OrderCard = ({ order }) => {
  const now = new Date();

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`
        h-[150px] 
        rounded-xl border 
        p-3 
        flex flex-col justify-between 
        hover:shadow-md transition
        ${statusStyle(order.status)}
      `}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold text-text-primary">
          #{order.number}
        </h2>

        <span className="text-[11px] flex items-center gap-1 font-medium">
          <FaCheckCircle className="text-[9px]" />
          {order.status === "Ready" ? "Ready" : order.status}
        </span>
      </div>

      {/* DATE + TIME */}
      <div className="text-[11px] text-text-muted flex items-center gap-2">
        <FaCalendarAlt className="text-[10px]" />
        {date} • {time}
      </div>

      {/* ITEMS */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <FaUtensils className="text-[11px]" />
        {order.items} items
      </div>

      {/* TOTAL */}
      <div className="border-t pt-2 flex justify-between items-center">
        <span className="text-xs text-text-muted">Total</span>
        <span className="font-semibold text-primary">
          ₹{order.total}
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
