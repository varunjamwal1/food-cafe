import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../https/index";

const roles = ["waiter", "cashier", "admin"];

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  // -------- REGISTER MUTATION --------
  const registerMutation = useMutation({
    mutationFn: registerUser,

    onSuccess: (res) => {
      enqueueSnackbar(res?.data?.message || "Registration successful", {
        variant: "success",
      });

      // go to login page
      setTimeout(() => navigate("/auth"), 700);
    },

    onError: (err) => {
      enqueueSnackbar(
        err?.response?.data?.message || "Registration failed",
        { variant: "error" }
      );
    },
  });

  // -------- INPUT CHANGE --------
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // -------- ROLE SELECT --------
  const handleRoleSelection = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  // -------- SUBMIT --------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      enqueueSnackbar("Please select a role", { variant: "warning" });
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="  space-y-4">

      <Input
        label="Employee Name"
        type="text"
        name="name"
        placeholder="Enter employee name"
        value={formData.name}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Phone"
        type="tel"
        name="phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
      />

      {/* Roles */}
      <div>
        <label className="block mb-2 text-sm text-[var(--color-text-secondary)]">
          Choose Role
        </label>

        <div className="flex gap-3">
          {roles.map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => handleRoleSelection(role)}
              className={`px-4 py-2 border rounded-lg transition
                ${
                  formData.role === role
                    ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)]"
                    : "border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-black"
                }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={registerMutation.isPending}
        className="w-full bg-[var(--color-primary)] text-black py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] transition"
      >
        {registerMutation.isPending ? "Creating..." : "Sign Up"}
      </button>

    </form>
  );
};

export default Register;


/* Reusable Input Component */
const Input = ({ label, type, name, placeholder, value, onChange }) => (
  <div>
    <label className="block mb-1 text-sm text-[var(--color-text-secondary)]">
      {label}
    </label>

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)]"
      required
    />
  </div>
);
