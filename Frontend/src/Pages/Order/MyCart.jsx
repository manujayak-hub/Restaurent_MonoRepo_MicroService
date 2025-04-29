import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderService from '../../Services/OrderService';
import RestaurantService from '../../Services/RestaurentService';
import { FaUtensils, FaMoneyBillAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const MyCart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [otherOrders, setOtherOrders] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('other');
  
  const customerId = localStorage.getItem('userId'); // or get it however you store it

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getByCustomerId(customerId);
        const allOrders = response.data;

        // Fetch restaurant details for each order
        const enrichedOrders = await Promise.all(allOrders.map(async (order) => {
          if (order.restaurantId) {
            const restaurantRes = await RestaurantService.getById(order.restaurantId);
            return { ...order, restaurantDetails: restaurantRes.data };
          }
          return { ...order, restaurantDetails: null };
        }));

        // Divide orders into completed and other orders
        const completed = enrichedOrders.filter(order => order.status === 'Completed');
        const others = enrichedOrders.filter(order => order.status !== 'Completed');
        
        setCompletedOrders(completed);
        setOtherOrders(others);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-4xl mx-auto">
          {/* Title and Delivery Button Row */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#e87c21] drop-shadow">
              🛒 My Cart
            </h2>

            {/* Delivery Page Button */}
            <button
              onClick={() => navigate('/userdashboard')}
              className="flex items-center bg-gradient-to-r from-[#df9f6b] to-[#e87c21] hover:from-[#df9f6b] hover:to-[#e87c21] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              My deliveries
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <button
              className={`py-2 px-4 text-lg font-semibold rounded-l-xl ${activeTab === 'other' ? 'bg-[#e87c21] text-white' : 'bg-white text-[#e87c21]'}`}
              onClick={() => setActiveTab('other')}
            >
              My Orders
            </button>
            <button
              className={`py-2 px-4 text-lg font-semibold rounded-r-xl ${activeTab === 'completed' ? 'bg-[#e87c21] text-white' : 'bg-white text-[#e87c21]'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed Orders
            </button>
          </div>

          {loading ? (
            <div className="text-center text-lg font-semibold text-gray-500">
              Loading your orders...
            </div>
          ) : (
            <>
              {/* Completed Orders Tab */}
              {activeTab === 'completed' && completedOrders.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-center text-[#e87c21] mb-8">Completed Orders</h3>
                  <div className="space-y-6">
                    {completedOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex-1 space-y-2">
                          {/* Restaurant Details */}
                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaUtensils className="text-[#7fc7e0] mr-2" />
                            <span className="font-semibold">{order.restaurantDetails?.name || 'Restaurant'}</span>
                          </p>

                          {/* Order Details */}
                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaMoneyBillAlt className="text-[#7fc7e0] mr-2" />
                            ₹{order.totalAmount.toFixed(2)}
                          </p>

                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date not available"}
                          </p>

                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaCheckCircle className="text-[#7fc7e0] mr-2" />
                            Status: {order.status}
                          </p>

                          {/* Ordered Items */}
                          {order.items && (
                            <div className="mt-4">
                              <h4 className="text-xl font-semibold text-[#e87c21]">Ordered Items</h4>
                              <ul className="space-y-4">
                                {order.items.map((item) => (
                                  <li key={item.itemId} className="bg-gray-100 rounded-xl p-4 shadow">
                                    <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                                    <div className="text-sm text-gray-600">
                                      Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                    </div>
                                    <div className="text-sm text-gray-700 font-medium">
                                      Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6">
                          <button
                            onClick={() => navigate(`/order/${order.id}`)}
                            className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Orders Tab */}
              {activeTab === 'other' && otherOrders.length > 0 && (
                <div>
                  <div className="space-y-6">
                    {otherOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
                      >
                        <div className="flex-1 space-y-2">
                          {/* Restaurant Details */}
                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaUtensils className="text-[#7fc7e0] mr-2" />
                            <span className="font-semibold">{order.restaurantDetails?.name || 'Restaurant'}</span>
                          </p>

                          {/* Order Details */}
                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaMoneyBillAlt className="text-[#7fc7e0] mr-2" />
                            ₹{order.totalAmount.toFixed(2)}
                          </p>

                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date not available"}
                          </p>

                          <p className="flex items-center text-gray-700 text-sm md:text-base">
                            <FaCheckCircle className="text-[#7fc7e0] mr-2" />
                            Status: {order.status}
                          </p>

                          {/* Ordered Items */}
                          {order.items && (
                            <div className="mt-4">
                              <h4 className="text-xl font-semibold text-[#e87c21]">Ordered Items</h4>
                              <ul className="space-y-4">
                                {order.items.map((item) => (
                                  <li key={item.itemId} className="bg-gray-100 rounded-xl p-4 shadow">
                                    <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                                    <div className="text-sm text-gray-600">
                                      Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6">
                          <button
                            onClick={() => navigate(`/order/${order.id}`)}
                            className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCart;
