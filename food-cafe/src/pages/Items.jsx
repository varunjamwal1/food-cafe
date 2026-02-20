import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";

import BackButton from "../componets/Home/BackButtoon";
import CustomeInfo from "../componets/Menu/CustomeInfo";
import CardItems from "../componets/Menu/CardItems";
import Billes from "../componets/Menu/Billes";
import { FaShoppingCart } from "react-icons/fa";

const Items = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = state?.category;

  const [qty, setQty] = useState({});

  if (!category) {
    return (
      <div className="p-4">
        <p>No category selected</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const increment = (id) =>
    setQty((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const decrement = (id) =>
    setQty((prev) => ({ ...prev, [id]: Math.max((prev[id] || 0) - 1, 0) }));

  const handleAddToCart = (item) => {
    const itemQty = qty[item.id] || 0;
    if (itemQty < 1) return;

    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: itemQty,
      })
    );

    setQty((prev) => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <div className="bg-[var(--color-background)] h-[650px] flex flex-col">
      <div className="flex flex-1 gap-2 p-2 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="flex-[0_0_70%] bg-[var(--color-surface)] rounded-2xl shadow flex flex-col overflow-hidden">
          <div className="p-2 border-b border-[var(--color-border)]">
            <BackButton />
            <h1 className="text-xl font-bold mt-2">{category.name} Items</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[var(--color-card)] rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-28 object-cover"
                    />
                    <span
                      className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-bold rounded ${
                        item.type === "veg"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="p-2 flex flex-col gap-2">
                    <div>
                      <h3 className="font-semibold text-sm leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[var(--color-primary)] font-semibold text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => decrement(item.id)}
                        className="w-7 h-7 rounded-md bg-[var(--color-danger)] text-white text-sm"
                      >
                        −
                      </button>
                      <span className="font-bold text-sm min-w-[20px] text-center">
                        {qty[item.id] || 0}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="w-7 h-7 rounded-md bg-[var(--color-success)] text-white text-sm"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center justify-center gap-2 text-xs py-1.5 rounded-md bg-[var(--color-primary)] text-white hover:opacity-90 active:scale-95 transition"
                    >
                      <FaShoppingCart className="text-sm" /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-[0_0_30%] bg-[var(--color-surface)] rounded-2xl shadow flex flex-col overflow-hidden">
          <div className="border-b border-[var(--color-border)]">
            <CustomeInfo />
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <CardItems />
          </div>
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            <Billes />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Items;
