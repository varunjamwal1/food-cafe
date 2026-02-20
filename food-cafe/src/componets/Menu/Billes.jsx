import React, { useState } from "react";
import { useSelector } from "react-redux";

const Billes = () => {
  const items = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("cash"); // Payment mode state

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = +(total * 0.0525).toFixed(2);
  const grandTotal = total + tax;

  return (
    <div className="bg-[var(--color-card)] p-2 rounded-t-md shadow">

      {/* Items Row */}
      <div className="flex justify-between mb-1">
        <span className="text-[var(--color-text-secondary)] text-sm">
          Items ({items.length})
        </span>
        <span className="font-semibold text-sm">₹{total}</span>
      </div>

      {/* Tax Row */}
      <div className="flex justify-between mb-1 text-sm">
        <span className="text-[var(--color-text-secondary)]">Tax (5.25%)</span>
        <span className="font-semibold text-sm">₹{tax}</span>
      </div>

      <div className="border-t border-[var(--color-border)] my-1"></div>

      {/* Total Row */}
      <div className="flex justify-between text-ml font-bold mb-2">
        <span>Total</span>
        <span className="text-[var(--color-primary)]">₹{grandTotal}</span>
      </div>

      {/* Payment Selection */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button
          onClick={() => setPayment("cash")}
          className={`h-8 px-3 text-xs rounded-md font-medium transition ${
            payment === "cash"
              ? "bg-[var(--color-success)] text-white"
              : "bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-background)]"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPayment("online")}
          className={`h-8 px-3 text-xs rounded-md font-medium transition ${
            payment === "online"
              ? "bg-[var(--color-primary)] text-white"
              : "bg-white border border-[var(--color-border)] hover:bg-[var(--color-background)]"
          }`}
        >
          Online
        </button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => console.log("Print receipt")}
          className="h-9 px-3 text-xs rounded-md font-medium transition bg-[var(--color-secondary)] text-white hover:opacity-90"
        >
          Print Receipt
        </button>
        <button
          onClick={() => console.log("Order placed via", payment)}
          className="h-9 px-3 text-xs rounded-md font-semibold transition bg-[var(--color-primary)] text-white hover:opacity-90"
        >
          Place Order
        </button>
      </div>

    </div>
  );
};

export default Billes;
