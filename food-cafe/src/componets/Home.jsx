import React from "react";
import BottomNav from "./BottomNav";
import Greetings from "./Home/Greetings";
import MiniCard from "./Home/MiniCard";
import PopularDishes from "./Home/PopularDishes";
import { FaClock, FaCoins } from "react-icons/fa";
import RecentOrder from "./Home/RecentOrder";

const Home = () => {
  return (
    <div className="min-h-[calc(100dvh-70px)] bg-background flex flex-col">

      {/* MAIN WRAPPER */}
      <main className="flex-1 px-4 py-4 pb-10 lg:pb-6 max-w-7xl w-full mx-auto overflow-hidden">

        <div className="h-full flex flex-col lg:flex-row gap-4">

          {/* LEFT SIDE */}
          <section className="lg:w-3/5 flex flex-col gap-4 overflow-hidden">

            {/* Greeting */}
            <Greetings />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              <MiniCard
                title="in progress times"
                icon={FaClock}
                number={16}
                footer={3.6}
              />

              <MiniCard
                title="total earning"
                icon={FaCoins}
                number={512}
                footer={1.6}
              />

              <MiniCard
                title="completed orders"
                icon={FaClock}
                number={84}
                footer={-2.1}
              />

            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 bg-surface border border-border rounded-2xl overflow-y-auto no-scrollbar p-4 h-[190px]">
    <RecentOrder />
  </div>

          </section>

          {/* RIGHT SIDE */}
<aside className="lg:w-2/5 h-[620px] bg-surface border border-border rounded-2xl shadow-sm flex flex-col">
  <PopularDishes />
</aside>



        </div>

      </main>

      {/* FIXED NAV */}
      <BottomNav />

    </div>
  );
};

export default Home;
