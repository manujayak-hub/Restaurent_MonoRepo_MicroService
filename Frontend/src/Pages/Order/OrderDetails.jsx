import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderService from '../../Services/OrderService';
import { FaUtensils, FaMoneyBillAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const OrderDetails = () => {
  const { id } = useParams(); // Retrieve the order ID from the URL params
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await OrderService.getById(id); // Fetch order details using the API
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

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
                  <h3 className="text-2xl font-semibold text-[#e87c21]">{orderDetails.restaurantName}</h3>
                  <p className="text-lg text-gray-700">Order ID: {orderDetails.id}</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center">
                    <FaUtensils className="text-[#7fc7e0] mr-2" />
                    <span className="text-lg text-gray-700 font-semibold">Restaurant:</span>
                    <span className="ml-2 text-gray-600">{orderDetails.restaurantName}</span>
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

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => navigate('/mycart')}
                    className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Back to My Cart
                  </button>
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
