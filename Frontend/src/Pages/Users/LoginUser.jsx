import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../Services/AuthService"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";



const LoginUser = () =>
{
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loginResponse, setLoginResponse] = useState(null);
  const navigate = useNavigate()


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    console.log("Submitting login...");

    try
    {
      const response = await authService.login(form);
      console.log("✅ Login successful:", response);
      setLoginResponse(response); // Save the entire response to state
    } catch (err)
    {
      console.error("❌ Login error:", err);
      alert("❌ Login failed: " + (err?.response?.data?.message || err.message || "Something went wrong!"));
    }
  };

  // Once loginResponse is set, store values in localStorage
  useEffect(() =>
  {
    if (loginResponse)
    {
      const { accessToken, refreshToken, uid, uemail, uname, urole } = loginResponse;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", uid);
      localStorage.setItem("userEmail", uemail);
      localStorage.setItem("userName", uname);
      localStorage.setItem("userRole", urole);
      setTimeout(() =>
      {
        alert("✅ Logged in and values saved!");

        if (urole === "driver")
        {
          navigate("/DriverProfile");
        } else if (urole === "owner")
        {
          navigate("/resowner");
        } else if (urole === "user")
        {
          navigate("/home");
        }
      }, 100); // Delay slightly to let localStorage complete
    }
  }, [loginResponse]);
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30 transition-all duration-500">
        <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-200 backdrop-blur-md">
          <h2 className="text-4xl font-extrabold text-center text-[#e87c21] drop-shadow mb-6">
            🔐 Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-500 italic mb-8">
            🛵 Your cravings are waiting! Login to access deliciousness 😋🍱
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e87c21] to-[#ffa94d] hover:from-[#cf6a18] hover:to-[#f5b678] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🔓 Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginUser;
