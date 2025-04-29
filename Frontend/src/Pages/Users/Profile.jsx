import { useEffect, useState } from "react";
import AuthService from "../../Services/AuthService";
import OrderService from "../../Services/OrderService";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Trash2, User, FileText, Loader } from "lucide-react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const Profile = () =>
{
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [deleteAnimation, setDeleteAnimation] = useState(null);
  const navigate = useNavigate();

  useEffect(() =>
  {
    const fetchUserDetails = async () =>
    {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken)
      {
        navigate("/");
        return;
      }

      try
      {
        const response = await AuthService.getUserDetails(accessToken);
        const userDetails = response.userdetails;
        console.log("User Details:", userDetails);

        setUser({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          id: userDetails._id,
        });


        const orderResponse = await OrderService.getByCustomerId(userDetails._id);
        console.log("Orders:", orderResponse.data);

        setOrders(orderResponse.data);


        setTimeout(() => setShowOrders(true), 500);
      } catch (error)
      {
        console.error("Failed to fetch user details or orders:", error);
      } finally
      {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const deleteOrder = async (orderId) =>
  {

    setDeleteAnimation(orderId);

    try
    {

      setTimeout(async () =>
      {

        await OrderService.delete(orderId);


        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        console.log("Order deleted successfully");
        setDeleteAnimation(null);
      }, 500);
    } catch (error)
    {
      console.error("Failed to delete order:", error);
      setDeleteAnimation(null);
    }
  };

  if (loading)
  {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="flex flex-col items-center text-[#e87c21]">
          <Loader className="animate-spin h-12 w-12 mb-4" />
          <div className="text-2xl font-semibold animate-pulse">Loading your profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-[#7fc7e0] via-white to-[#e87c21]/30 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card with Animation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#e87c21]/10 p-4 rounded-full">
                <User size={40} className="text-[#e87c21]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-[#e87c21] mb-6 text-center">
              Your Profile
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
                <label className="text-gray-600 text-sm mb-1">First Name</label>
                <div className="font-semibold text-[#1f2e4a] text-xl">{user.firstName}</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105">
                <label className="text-gray-600 text-sm mb-1">Last Name</label>
                <div className="font-semibold text-[#1f2e4a] text-xl">{user.lastName}</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-105 md:col-span-2">
                <label className="text-gray-600 text-sm mb-1">Email</label>
                <div className="font-semibold text-[#1f2e4a] text-xl">{user.email}</div>
              </div>
            </div>
          </div>

          {/* Orders Section with Animation */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition-all duration-500 hover:shadow-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-[#7fc7e0]/10 p-4 rounded-full">
                <FileText size={40} className="text-[#7fc7e0]" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#7fc7e0] mb-6 text-center">
              Your Payments
            </h2>

            <div className="mb-6 flex justify-center">
              <button
                onClick={() => setShowOrders(!showOrders)}
                className="flex items-center space-x-2 bg-[#7fc7e0]/10 hover:bg-[#7fc7e0]/20 text-[#7fc7e0] py-2 px-4 rounded-lg transition-all duration-300"
              >
                <span>{showOrders ? "Hide Orders" : "Show Orders"}</span>
                <ArrowDown className={`transform transition-transform duration-300 ${showOrders ? "rotate-180" : ""}`} size={16} />
              </button>
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showOrders ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
              {orders.length === 0 ? (
                <div className="text-center text-gray-500 py-8 animate-pulse">No payments found.</div>
              ) : (
                <div className="overflow-x-auto rounded-lg shadow">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#7fc7e0]/20 to-[#e87c21]/20 text-gray-700">
                        <th className="px-4 py-3">Item Name</th>
                        <th className="px-4 py-3">Quantity</th>
                        <th className="px-4 py-3">Total Amount</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className={`border-t text-center transition-all duration-500 ${deleteAnimation === order.id
                            ? "transform translate-x-full opacity-0"
                            : "hover:bg-gray-50"
                            }`}
                        >
                          <td className="px-4 py-3 font-medium">
                            {order.items && order.items.length > 0 ? order.items[0].name : "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            {order.items && order.items.length > 0 ? order.items[0].quantity : "N/A"}
                          </td>
                          <td className="px-4 py-3 font-medium text-[#e87c21]">
                            ₹{order.totalAmount?.toFixed(2) ?? "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                              }`}>
                              {order.status || "N/A"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-300"
                              aria-label="Delete order"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;