import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderService from '../../Services/OrderService';
import RestaurantService from '../../Services/RestaurentService';
import { FaUtensils, FaMoneyBillAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [orderedItems, setOrderedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderStages = ['Placed', 'Preparing', 'On the Way', 'Completed'];

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderRes = await OrderService.getById(id);
        const order = orderRes.data;
        setOrderDetails(order);
        setOrderedItems(order.items || []);

        if (order.restaurantId) {
          const restaurantRes = await RestaurantService.getById(order.restaurantId);
          setRestaurantDetails(restaurantRes.data);
        }
      } catch (error) {
        console.error('Error fetching order or restaurant details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const getStageIndex = (status) => {
    return orderStages.findIndex(stage => stage.toLowerCase() === status.toLowerCase());
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">
            🛒 Order Details
          </h2>

          {loading ? (
            <div className="text-center text-lg font-semibold text-gray-500">
              Loading order details...
            </div>
          ) : (
            orderDetails && (
              <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-[#e87c21]">
                    {restaurantDetails?.name || 'Restaurant'}
                  </h3>
                  {restaurantDetails?.address && (
                    <p className="text-gray-500">{restaurantDetails.address}</p>
                  )}
                </div>

                {/* Progress Tracker */}
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-[#e87c21] mb-4">Tracker</h4>
                  <div className="relative flex justify-between items-center">
                    {orderStages.map((stage, index) => {
                      const isCompleted = index <= getStageIndex(orderDetails.status);
                      return (
                        <div key={stage} className="flex-1 flex flex-col items-center text-center">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.2 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              isCompleted
                                ? 'bg-[#e87c21] text-white'
                                : 'bg-gray-300 text-gray-500'
                            }`}
                          >
                            {index + 1}
                          </motion.div>
                          <span className={`mt-2 text-sm ${isCompleted ? 'text-[#e87c21]' : 'text-gray-400'}`}>
                            {stage}
                          </span>
                          {index < orderStages.length - 1 && (
                            <div className="w-full h-1 bg-gray-300 absolute top-4 z-0 left-1/2 transform -translate-x-1/2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width:
                                    getStageIndex(orderDetails.status) > index
                                      ? '100%'
                                      : '0%',
                                }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="h-full bg-[#e87c21]"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-6 mt-10">
                  <div className="flex items-center">
                    <FaUtensils className="text-[#7fc7e0] mr-2" />
                    <span className="text-lg text-gray-700 font-semibold">Restaurant:</span>
                    <span className="ml-2 text-gray-600">{restaurantDetails?.name}</span>
                  </div>

                  <div className="flex items-center">
                    <FaMoneyBillAlt className="text-[#7fc7e0] mr-2" />
                    <span className="text-lg text-gray-700 font-semibold">Total Amount:</span>
                    <span className="ml-2 text-gray-600">₹{orderDetails.totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center">
                    <FaClock className="text-[#7fc7e0] mr-2" />
                    <span className="text-lg text-gray-700 font-semibold">Order Date:</span>
                    <span className="ml-2 text-gray-600">
                      {new Date(orderDetails.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaCheckCircle className="text-[#7fc7e0] mr-2" />
                    <span className="text-lg text-gray-700 font-semibold">Status:</span>
                    <span className="ml-2 text-gray-600">{orderDetails.status}</span>
                  </div>
                </div>

                {/* Ordered Items */}
                <div className="mt-10">
                  <h4 className="text-xl font-bold text-[#e87c21] mb-4">Ordered Items</h4>
                  <ul className="space-y-4">
                    {orderedItems.map((item, index) => (
                      <li key={item.itemId || index} className="bg-gray-100 rounded-xl p-4 shadow">
                        <div className="flex gap-4 items-center">
                          {item.imgUrl ? (
                            <img
                              src={item.imgUrl}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                              No Image
                            </div>
                          )}

                          <div>
                            <div className="text-lg font-semibold text-gray-800">{item.name}</div>
                            <div className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-700 font-medium">
                              Subtotal: ₹{(item.quantity * item.price).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    onClick={() => navigate('/mycart')}
                    className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Back to My Cart
                  </button>

                  {orderDetails.status !== 'Completed' && (
                    <button
                      onClick={() => navigate(`/cancelorder/${id}`)}
                      className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
