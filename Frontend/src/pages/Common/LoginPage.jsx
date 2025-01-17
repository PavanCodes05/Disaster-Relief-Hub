import React, { useState } from "react";
import { MailIcon, LockIcon } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleEmailChange = (e) =>
    setFormData({ ...formData, email: e.target.value });
  const handlePasswordChange = (e) =>
    setFormData({ ...formData, password: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-12"
      >
        <div className="order-1 md:order-2 w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 md:mb-12">
            Welcome to Disaster Relief Hub
          </h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-12">
            Every act of kindness counts. Log in to give support or share your
            needs—we’re in this together.
          </p>
        </div>
        <div className="order-2 md:order-1 w-full md:w-auto flex flex-col items-center md:items-start">
          <label className="input input-bordered flex items-center gap-2 w-full max-w-sm mb-4">
            <MailIcon className="text-gray-400" />
            <input
              type="email"
              className="flex-grow"
              placeholder="Email"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full max-w-sm mb-6">
            <LockIcon className="text-gray-400" />
            <input
              type="password"
              className="flex-grow"
              placeholder="Password"
              value={formData.password}
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit" className="btn btn-primary w-full max-w-sm">
            Login
          </button>
          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
