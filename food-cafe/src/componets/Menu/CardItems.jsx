import React from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartSlice";

const CardItems = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);

  const handleDelete = (id) => dispatch(removeItem(id));

  return (
    <div className="flex flex-col">
      <h2 className="text-sm font-bold mb-1 text-[var(--color-text-secondary)]">
        ORDER DETAILS
      </h2>

      <div className="divide-y divide-[var(--color-border)]">
        {items.length === 0 && (
          <p className="text-xs text-[var(--color-text-muted)] py-2">
            No items in the cart
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="py-1 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-ml">{item.name}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Qty: {item.qty}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaNotesMedical className="text-[var(--color-info)] cursor-pointer hover:scale-110 transition" />
              <RiDeleteBin2Fill
                className="text-[var(--color-danger)] cursor-pointer hover:scale-110 transition"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardItems;
