import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../https";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* Handle input */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* API CALL */
const loginMutation = useMutation({
  mutationFn: loginUser,

  onSuccess: (res) => {
    const backend = res.data;

    if (!backend?.data || !backend?.token) {
      enqueueSnackbar("Server error: invalid response", { variant: "error" });
      return;
    }

    const { _id, name, email, phone, role } = backend.data;

    dispatch(setUser({ _id, name, email, phone, role }));

    // save token
    localStorage.setItem("token", backend.token);

    enqueueSnackbar(backend.message || "Login successful!", {
      variant: "success",
    });

    navigate("/", { replace: true }); // 🔥 CRITICAL FIX
  },

  onError: (error) => {
    const message =
      error?.response?.data?.message ||
      "Login failed. Please try again.";

    enqueueSnackbar(message, { variant: "error" });
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <Input
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
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

      <button
        type="submit"
        disabled={loginMutation.isLoading}
        className="w-full py-3 rounded-xl font-semibold text-black 
        bg-[var(--color-primary)] hover:scale-[1.02] active:scale-95 
        transition duration-200 shadow-lg"
      >
        {loginMutation.isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;

/* INPUT COMPONENT */
const Input = ({ label, type, name, placeholder, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm text-white/80">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 rounded-xl 
      bg-white/10 backdrop-blur-md
      border border-white/20 
      text-white placeholder-white/50
      focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
      transition"
    />
  </div>
);
