import { useState, useEffect } from "react";
import RestaurantService from "../../Services/RestaurentService" // Update the path if needed
import OrderService from "../../Services/OrderService"; // Update the path if needed

const ResOrder = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState({});

  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch restaurants owned by the logged-in user
        const restaurantResponse = await RestaurantService.getbyowner(userId);
        const restaurantList = restaurantResponse.data;
        setRestaurants(restaurantList);

        // Fetch orders for each restaurant
        const restaurantOrders = {};
        for (const restaurant of restaurantList) {
          const ordersResponse = await OrderService.getByRestaurantId(restaurant.id);
          restaurantOrders[restaurant.id] = ordersResponse.data;
        }
        setOrders(restaurantOrders);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleCompleteOrder = (restaurantId, orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      updatedOrders[restaurantId] = updatedOrders[restaurantId].map((order) =>
        order.id === orderId ? { ...order, status: "Completed" } : order
      );
      return updatedOrders;
    });

    console.log(`✅ Order ${orderId} for Restaurant ${restaurantId} marked as completed.`);
    // You can also call an API to update order status if needed
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">
          🛒 Manage Orders
        </h1>

        {restaurants.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-500">
            No restaurants found for this owner.
          </div>
        ) : (
          restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="mb-8 p-6 rounded-xl shadow-lg bg-white border-t-8 border-[#7fc7e0] hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-[#1f2e4a] mb-4">{restaurant.name}</h3>

              <div>
                {orders[restaurant.id] && orders[restaurant.id].length === 0 ? (
                  <p className="text-center text-lg font-semibold text-gray-500">
                    No orders yet.
                  </p>
                ) : (
                  orders[restaurant.id]?.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center border-b py-3"
                    >
                      <div>
                        <p className="font-semibold text-[#1f2e4a]">{order.customerName}</p>
                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                      </div>
                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleCompleteOrder(restaurant.id, order.id)}
                          className="bg-green-500 text-white px-4 py-1 rounded-xl hover:bg-green-600 transition-all duration-300"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResOrder;
