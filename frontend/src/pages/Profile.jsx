import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
  });

  const [orders, setOrders] = useState([]);

  // Change Password fields
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [pwLoading, setPwLoading] = useState(false);

  // Fetch orders
  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            "http://localhost:8000/api/v1/orders/user",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setOrders(res.data.orders || []);
        } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error("Failed to fetch orders");
        }
      };
      fetchOrders();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8000/api/v1/user/update-profile",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setUser(res.data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    const { newPassword, confirmPassword } = passwordForm;
    if (!newPassword || !confirmPassword)
      return toast.error("All fields are required");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      setPwLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/change-password/${user.email}`,
        passwordForm
      );
      toast.success(res.data.message);
      setPasswordForm({ newPassword: "", confirmPassword: "" });

      // Optional: Logout after password change
      handleLogout();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setPwLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    navigate("/"); // redirect to home/login
  };

  return (
    <div className="pt-24 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/120"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-pink-300 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-2">
          {user?.firstName}'s Profile
        </h2>
        <p className="text-gray-600 text-center mb-6">Manage your account</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {["account", "orders", "changePassword"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-medium ${
                activeTab === tab
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition`}
            >
              {tab === "account"
                ? "Account"
                : tab === "orders"
                ? "Orders"
                : "Change Password"}
            </button>
          ))}
        </div>

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-4">
            {[
              "firstName",
              "lastName",
              "phoneNo",
              "address",
              "city",
              "zipCode",
            ].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-pink-300"
                />
              </div>
            ))}
            <button
              onClick={handleSave}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-medium text-white ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              } transition`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border p-4 rounded-lg flex justify-between items-center flex-wrap"
                >
                  <span>Order #{order._id}</span>
                  <span className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="font-semibold">${order.total}</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "changePassword" && (
          <div className="space-y-4">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              autoComplete="new-password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-pink-300"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border rounded-lg p-2 focus:ring focus:ring-pink-300"
            />
            <button
              onClick={handleChangePassword}
              disabled={pwLoading}
              className={`w-full py-3 rounded-xl font-medium text-white ${
                pwLoading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
              } transition`}
            >
              {pwLoading ? "Changing..." : "Change Password"}
            </button>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
