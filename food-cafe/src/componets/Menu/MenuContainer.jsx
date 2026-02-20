import React from "react";
import { useNavigate } from "react-router-dom";

const MenuContainer = ({ menu }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate("/items", { state: { category } });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menu.map((section) => (
        <div
          key={section.name}
          onClick={() => handleClick(section)}
          className="flex flex-col items-center p-4 rounded-2xl cursor-pointer transition-all bg-[var(--color-card)] hover:scale-105 hover:shadow-lg"
        >
          <img
            src={section.image}
            alt={section.name}
            className="w-20 h-20 object-cover rounded-full border-4 border-white shadow"
          />

          <span className="mt-3 font-semibold text-center">
            {section.name}
          </span>

          <span className="text-xs opacity-70 mt-1">
            {section.items.length} items
          </span>
        </div>
      ))}
    </div>
  );
};

export default MenuContainer;
