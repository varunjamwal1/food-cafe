import React, { useState } from "react";
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Safe selector with default values
  const user = useSelector((state) => state.user) || {};
  const name = user.name || "Guest";
  const role = user.role || "user";
  const isAuth = user.isAuth || false;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <header className="h-18 border-b border-border sticky top-0 z-[100] bg-surface">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={() => navigate("/")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
            className="
              text-xl md:text-2xl font-bold tracking-wide
              text-[var(--color-primary)]
              cursor-pointer select-none
              transition-all duration-200
              hover:scale-105 hover:brightness-110
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-md px-1
            "
          >
            GREEN COFFEE
          </h1>

          {/* Search */}
          <div className="hidden md:flex items-center w-1/2 bg-card border border-border rounded-full px-4 py-2 z-10">
            <FaSearch className="text-text-muted mr-3" />
            <input
              type="text"
              placeholder="Search coffee..."
              className="bg-transparent outline-none w-full placeholder:text-text-muted"
            />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-6 text-xl">
            <FaBell className="cursor-pointer text-text-secondary hover:text-primary transition" />

            {role === "admin" && (
              <MdDashboard
                onClick={goToDashboard}
                className="cursor-pointer text-text-secondary hover:text-primary transition"
                title="Dashboard"
              />
            )}

            {isAuth ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-3xl text-primary" />
                  <div className="text-sm leading-tight">
                    <p className="font-semibold text-text-primary">{name}</p>
                    <p className="text-text-muted capitalize">{role}</p>
                  </div>
                </div>

                <FaSignOutAlt
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500 hover:text-red-600 transition text-2xl"
                  title="Logout"
                />
              </div>
            ) : (
              <FaUserCircle className="cursor-pointer text-text-secondary hover:text-primary transition" />
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-4 text-xl">
            <FaBell className="text-text-secondary" />
            {role === "admin" && (
              <MdDashboard
                onClick={goToDashboard}
                className="cursor-pointer text-text-secondary hover:text-primary transition"
              />
            )}
            <button onClick={() => setOpen(!open)}>
              {open ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-b border-border bg-background px-4 py-3 space-y-3 z-50">
          {isAuth && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaUserCircle className="text-3xl text-primary" />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-text-muted capitalize">{role}</p>
                </div>
              </div>

              <FaSignOutAlt
                onClick={handleLogout}
                className="cursor-pointer text-red-500 text-xl"
              />
            </div>
          )}

          <div className="h-[50px] flex items-center">
            <div className="flex items-center w-full bg-card border border-border rounded-full px-4 py-2">
              <FaSearch className="text-text-muted mr-2" />
              <input
                type="text"
                placeholder="Search coffee..."
                className="bg-transparent outline-none w-full placeholder:text-text-muted"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;