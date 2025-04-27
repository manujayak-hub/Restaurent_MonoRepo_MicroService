import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30 py-4 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-[#e87c21] drop-shadow-lg">
          🍴 Foodies
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="text-[#1f2e4a] font-semibold hover:text-[#e87c21] transition-all duration-300">
            Login
          </Link>
          <Link to="/register/driver" className="text-[#1f2e4a] font-semibold hover:text-[#e87c21] transition-all duration-300">
            Register as Delivery Rider
          </Link>
          <Link to="/register/user" className="text-[#1f2e4a] font-semibold hover:text-[#e87c21] transition-all duration-300">
            Register as Foodie
          </Link>
          <Link to="/register/owner" className="text-[#1f2e4a] font-semibold hover:text-[#e87c21] transition-all duration-300">
            Register Your Restaurent
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
