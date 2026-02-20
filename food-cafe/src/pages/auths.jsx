import React, { useState } from "react";
import Login from "../componets/auth/Login";
import Register from "../componets/auth/Register";

const Auths = () => {
  const [mode, setMode] = useState("login");

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* FULLSCREEN BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1555992336-03a23c7b20ee"
        alt="restaurant"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* MAIN CONTENT GRID */}
      <div className="relative z-10 grid md:grid-cols-2 min-h-screen">

        {/* LEFT SIDE (Quote Section) */}
        <div className="hidden md:flex flex-col justify-end p-16 text-white">
          <blockquote className="text-2xl italic leading-relaxed max-w-xl">
            "Serve customers the best food with prompt and friendly service
            in a welcoming atmosphere — and they will keep coming back."
            <span className="block mt-6 text-[var(--color-primary)] font-semibold">
              — Founder of Restro
            </span>
          </blockquote>
        </div>

        {/* RIGHT SIDE (AUTH CARD) */}
        <div className="flex items-center justify-center ">

          <div className="w-full max-w-md">

            {/* GLASS CARD */}
            <div className="p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl">

              {/* Logo */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-[var(--color-primary)]">
                  Restro
                </h1>

                <h2 className="text-lg text-white/80 mt-2">
                  Employee {mode === "login" ? "Login" : "Registration"}
                </h2>
              </div>

              {/* Forms */}
              {mode === "login" ? <Login /> : <Register />}

              {/* Toggle */}
              <p className="text-center mt-6 text-white/70">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  onClick={() => setMode(mode === "login" ? "register" : "login")}
                  className="ml-2 text-[var(--color-primary)] font-semibold hover:underline"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auths;
