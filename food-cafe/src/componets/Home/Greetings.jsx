import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const [time, setTime] = useState(new Date());

  // 🔹 GET USER FROM REDUX
  const { name, role, isAuth } = useSelector((state) => state.user);

  // live clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-IN");

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <div>
      {/* main row */}
      <div className="flex items-center justify-between gap-6">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {getGreeting()}
          </h2>

          <p className="text-text-secondary mb-2">
            Welcome back,{" "}
            <span className="font-semibold text-text-primary">
              {isAuth && name ? name : "Guest"}
            </span>
          </p>

          <p className="text-text-muted">
            {role ? `You are logged in as ${role}` : "Give your best service to customers today!"}
          </p>
        </div>

        {/* RIGHT SIDE CLOCK */}
        <div className="text-right bg-surface border border-border rounded-xl px-6 py-4 min-w-[220px]">
          <p className="text-sm text-text-muted">{formattedDate}</p>
          <p className="text-2xl font-bold text-text-primary tracking-wide">
            {formattedTime}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Greetings;
