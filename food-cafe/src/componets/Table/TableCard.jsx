import React from "react";

const TableCard = ({ table, onClick }) => {
  const { number, status, seats } = table;
  const isReserved = status === "reserved";

  // Determine card and badge colors based on status
  const cardBg = isReserved
    ? "bg-[var(--color-card)] border-[var(--color-danger)] opacity-60 cursor-not-allowed"
    : "bg-[var(--color-card)] border-[var(--color-success)] cursor-pointer hover:scale-105";

  const statusBadge = isReserved
    ? "bg-[var(--color-danger)] text-white"
    : "bg-[var(--color-success)] text-white";

  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-2xl border shadow-lg flex flex-col items-center justify-center ${cardBg} transition-all duration-300`}
    >
      {/* Table Number */}
      <div className="text-2xl font-bold mb-2 text-[var(--color-text-primary)]">
        Table {number}
      </div>

      {/* Seats */}
      <div className="text-sm text-[var(--color-text-muted)] mb-3">
        Seats: {seats}
      </div>

      {/* Status Badge */}
      <div
        className={`px-4 py-1 rounded-full text-xs font-semibold uppercase ${statusBadge} tracking-wide`}
      >
        {isReserved ? "Reserved" : "Available"}
      </div>
    </div>
  );
};

export default TableCard;