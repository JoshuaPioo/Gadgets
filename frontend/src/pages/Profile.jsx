import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or your auth logic here
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="pt-24 px-6 max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-pink-300 object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-pink-600">Your Profile</h2>
        <p className="text-gray-600 mt-1">Manage your account</p>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate("/settings")}
            className="w-full py-3 bg-pink-500 text-white rounded-xl font-medium hover:bg-pink-600 transition"
          >
            Account Settings
          </button>

          <button
            onClick={() => navigate("/change-photo")}
            className="w-full py-3 bg-white border border-pink-400 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition"
          >
            Change Profile Photo
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
