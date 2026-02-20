import React from "react";
import { FaUtensils, FaChair, FaCheckCircle } from "react-icons/fa";

/* DEMO DATA */
const orders = [
  { id: 1, name: "Rahul", items: 10, table: 3, status: "Preparing" },
  { id: 2, name: "Aman", items: 4, table: 7, status: "Ready" },
  { id: 3, name: "Priya", items: 2, table: 1, status: "Served" },
  { id: 4, name: "Karan", items: 6, table: 5, status: "Preparing" },
  { id: 5, name: "Rahul", items: 10, table: 3, status: "Preparing" },
  { id: 6, name: "Aman", items: 4, table: 7, status: "Ready" },
  { id: 7, name: "Priya", items: 2, table: 1, status: "Served" },
  { id: 8, name: "Karan", items: 6, table: 5, status: "Preparing" },
  
];

/* STATUS COLOR */
const statusStyle = (status) => {
  switch (status) {
    case "Ready":
      return "bg-success/20 text-success";
    case "Served":
      return "bg-info/20 text-info";
    default:
      return "bg-warning/20 text-warning";
  }
};

const OrderList = ({ search = "" }) => {
  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">

      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between bg-surface border border-border rounded-xl px-4 py-3 hover:shadow-sm transition"
        >
          {/* LEFT */}
          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {order.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-medium text-text-primary">
                {order.name}
              </h3>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <FaUtensils className="text-[10px]" />
                {order.items} items
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="text-sm text-text-secondary flex items-center gap-1">
            <FaChair className="text-xs" />
            Table {order.table}
          </div>

          {/* STATUS */}
          <div
            className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 ${statusStyle(order.status)}`}
          >
            <FaCheckCircle className="text-[10px]" />
            {order.status === "Ready" ? "Ready to serve" : order.status}
          </div>
        </div>
      ))}

     

    </div>
  );
};

export default OrderList;
