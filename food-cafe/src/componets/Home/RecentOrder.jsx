import React, { useState } from "react";
import OrderList from "./OrderList";
import { FaSearch } from "react-icons/fa";

const RecentOrder = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col h-full min-h-0">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Recent Orders
        </h2>

        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center bg-surface border border-border rounded-xl px-3 py-2 mb-4">
        <FaSearch className="text-text-muted mr-2 text-sm" />
        <input
          type="text"
          placeholder="Search recent orders"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none w-full text-sm placeholder:text-text-muted"
        />
      </div>

{/* SCROLLABLE LIST */}
<div className=" h-[181px] overflow-y-auto no-scrollbar pr-2 border border-border rounded-xl">
  <OrderList search={query} />
</div>


    </div>
  );
};

export default RecentOrder;
