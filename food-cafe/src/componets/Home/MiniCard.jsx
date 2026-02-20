import React from "react";

const MiniCard = ({ title, icon: Icon, number, footer }) => {
  const isPositive = footer >= 0;
  const isEarning = title.toLowerCase().includes("earning");

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-text-secondary capitalize">
          {title}
        </h4>

        <div
          className={`p-3 rounded-xl
            ${isEarning ? "bg-green-500/15 text-green-500"
            : "bg-primary/15 text-primary"}`}
        >
          {Icon && <Icon size={18} />}
        </div>
      </div>

      {/* NUMBER */}
      <div className="text-3xl font-bold text-text-primary mb-2">
        {number}
      </div>

      {/* FOOTER */}
      <p
        className={`text-sm font-medium ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {footer}% than yesterday
      </p>
    </div>
  );
};

export default MiniCard;
