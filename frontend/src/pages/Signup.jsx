import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev)=> ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">
          Gadget Store Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-pink-300"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-pink-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-pink-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 pr-10 focus:outline-none focus:ring focus:ring-pink-300"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
