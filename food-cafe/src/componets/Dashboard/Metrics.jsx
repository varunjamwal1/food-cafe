import React, { useState } from "react";

const performanceMetrics = [
  { label: "Revenue", value: "₹50,500", change: "+12%", color: "text-emerald-400" },
  { label: "Outbound Clicks", value: "13,133", change: "+4%", color: "text-sky-400" },
  { label: "Total Customers", value: "22,566", change: "+9%", color: "text-violet-400" },
  { label: "Event Count", value: "55,006", change: "-2%", color: "text-rose-400" },
];

const restaurantMetrics = [
  { label: "Total Categories", value: "18", change: "+2 new", color: "text-amber-400" },
  { label: "Total Dishes", value: "146", change: "+5 added", color: "text-cyan-400" },
  { label: "Active Orders", value: "23", change: "Live", color: "text-green-400" },
  { label: "Total Tables", value: "32", change: "Full", color: "text-pink-400" },
];

const ranges = ["Last 7 days", "Last 1 month", "Last 6 months", "Last 1 year"];

export default function Metrics() {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState("Last 1 month");

  const MetricGrid = ({ data }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((metric, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-[var(--color-card)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition duration-200"
        >
          <p className="text-sm text-[var(--color-text-muted)]">{metric.label}</p>
          <h3 className="text-2xl font-semibold mt-1">{metric.value}</h3>
          <span className={`text-xs font-medium ${metric.color}`}>
            {metric.change}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full p-6 space-y-8 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)] shadow-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-wide">Performance</h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-xl mt-1">
            Track business growth, customer engagement and live restaurant activity.
          </p>
        </div>

        {/* Dropdown */}
        <div className="relative w-fit">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] transition"
          >
            <span className="text-sm">{range}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg overflow-hidden z-20">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-primary)] hover:text-black transition"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Business Metrics */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[var(--color-text-secondary)]">Business Metrics</h3>
        <MetricGrid data={performanceMetrics} />
      </div>

      {/* Restaurant Live Metrics */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-[var(--color-text-secondary)]">Restaurant Live Status</h3>
        <MetricGrid data={restaurantMetrics} />
      </div>
    </div>
  );
}