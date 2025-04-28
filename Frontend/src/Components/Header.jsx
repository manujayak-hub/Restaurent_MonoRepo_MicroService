import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaShoppingCart } from "react-icons/fa"; // Icons
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isLoggedIn = accessToken !== null;

  return (
    <header className="bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30 py-4 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-[#e87c21] drop-shadow-lg">
          🍴 Foodies
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-[#1f2e4a] font-semibold flex items-center gap-2">
                <FaUser /> {userName}
              </div>
              <div className="text-gray-600 text-sm">{userEmail}</div>
            </div>
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <button
                onClick={() => navigate("/mycart")}
                className="text-[#1f2e4a] hover:text-[#e87c21] transition-all duration-300"
              >
                <FaShoppingCart className="text-xl" />
              </button>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        ) : (
          <nav className="flex items-center gap-6 relative">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#1f2e4a] font-semibold hover:text-[#e87c21] transition-all duration-300"
            >
              <FaSignInAlt /> Login
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 bg-[#e87c21] hover:bg-[#e87c21]/80 text-white px-4 py-2 rounded-full text-sm transition-all duration-300"
              >
                <FaUserPlus /> Register
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link
                    to="/register/driver"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#e87c21]/10 transition-all"
                    onClick={() => setShowDropdown(false)}
                  >
                    🚚 Register as Delivery Rider
                  </Link>
                  <Link
                    to="/register/user"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#e87c21]/10 transition-all"
                    onClick={() => setShowDropdown(false)}
                  >
                    🍽️ Register as Foodie
                  </Link>
                  <Link
                    to="/register/owner"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#e87c21]/10 transition-all"
                    onClick={() => setShowDropdown(false)}
                  >
                    🏠 Register Your Restaurant
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
