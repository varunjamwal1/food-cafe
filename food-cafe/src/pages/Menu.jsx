// src/pages/Menu.jsx
import React from "react";
import { useSelector } from "react-redux";
import BottomNav from "../componets/BottomNav";
import BackButton from "../componets/Home/BackButtoon";
import MenuContainer from "../componets/Menu/MenuContainer";
import { FaUser } from "react-icons/fa";
import menuData from "../componets/Data/menuData";
import CustomeInfo from "../componets/Menu/CustomeInfo";
import CardItems from "../componets/Menu/CardItems";
import Billes from "../componets/Menu/Billes";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);

  const { customerName, tableNo } = customerData;

  return (
    <div className="h-[650px] bg-[var(--color-background)] flex flex-col">
      <div className="flex flex-1 gap-2 m-2 overflow-hidden">
        {/* LEFT SECTION */}
        <div className="flex-[0_0_70%] bg-[var(--color-surface)] rounded-2xl shadow flex flex-col overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface)]">
            <BackButton />
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <FaUser className="text-[var(--color-primary)]" />
                <span className="font-semibold">{customerName}</span>
              </div>
              <span className="text-sm text-[var(--color-text-muted)]">
                Table {tableNo}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Select Category</h1>
            <MenuContainer menu={menuData} />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-[0_0_30%] bg-[var(--color-surface)] rounded-2xl shadow flex flex-col overflow-hidden">
          <CustomeInfo />
          <div className="flex-1 overflow-y-auto p-2">
            <CardItems />
          </div>
          <Billes />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Menu;
