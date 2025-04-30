
import { useState } from "react";
import authService from "../../Services/AuthService";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import axios from "axios";


const RegisterDriver = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "owner",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      alert("🎉 User registered successfully!");

      await axios.post("http://localhost:8085/api/Email/send", {
        toEmail: form.email,
        subject: "🎉 Welcome to Our Delivery Team!",
        body: `Hi ${form.firstName},\n\nWelcome aboard! Your account has been successfully registered.\n\nHappy delivering! 🚗\n\n-- Team`,
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });
    } catch (err) {
      alert("❌ Error: " + err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30 transition-all duration-500">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-center text-[#7fc7e0] drop-shadow mb-6">
          🚀 Join Us
        </h2>
        <p className="text-center text-sm text-gray-500 italic mb-8">
        🚗🛵 "Hit the road 🛣️, deliver smiles 😊, and earn on your own terms 💼💰 — every meal you move makes a difference!" 🍱🎯
</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-[#7fc7e0]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="John"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-[#7fc7e0]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-[#7fc7e0]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-4 focus:ring-[#7fc7e0]/50 transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="••••••••"
            />
          </div>

          {/* Hidden role input */}
          <input type="hidden" name="role" value="owner" />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#e87c21] to-[#ffa94d] hover:from-[#cf6a18] hover:to-[#f5b678] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🎯 Register Now
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default RegisterDriver;
