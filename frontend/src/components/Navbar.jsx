import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/"); // redirect home
  };

  return (
    <nav className="backdrop-blur-lg bg-white/60 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-pink-600">
          MyShop
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-pink-600 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-pink-600 transition">
            Products
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-gray-800 transition">
                Hello, {user.firstName}
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-pink-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-pink-600 transition">
              Login
            </Link>
          )}

          <Link
            to="/cart"
            className="hover:text-pink-600 transition flex items-center"
          >
            <FiShoppingCart size={22} />
          </Link>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg shadow-md px-6 py-4 flex flex-col gap-4 text-gray-700 font-medium">
          <Link
            onClick={() => setOpen(false)}
            to="/"
            className="hover:text-pink-600 transition"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/products"
            className="hover:text-pink-600 transition"
          >
            Products
          </Link>

          {user ? (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/profile"
                className="hover:text-gray-800 transition"
              >
                Hello, {user.firstName}
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-left hover:text-pink-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="hover:text-pink-600 transition"
            >
              Login
            </Link>
          )}

          <Link
            onClick={() => setOpen(false)}
            to="/cart"
            className="hover:text-pink-600 transition flex items-center gap-1"
          >
            <FiShoppingCart /> Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
