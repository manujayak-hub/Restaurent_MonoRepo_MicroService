// src/pages/PlacedOrder.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkerAlt, FaUtensils, FaTruck } from 'react-icons/fa';

const PlacedOrder = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('orderDetails');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    } else {
      navigate('/home'); // redirect if no order data found
    }
  }, [navigate]);

  if (!order) return null;

  return (
    <div className="bg-gradient-to-r from-[#e6e6e6] to-[#e87c21] min-h-screen py-10 px-4 flex flex-col items-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your order! Here’s your order summary:</p>

        {/* Tracker */}
        <div className="flex items-center justify-between mb-10">
          {/* Step 1 - Placed */}
          <div className="flex flex-col items-center">
            <div className="bg-green-500 text-white p-3 rounded-full mb-2 shadow-md">
              <FaCheckCircle />
            </div>
            <span className="text-sm font-medium text-green-600">Order Placed</span>
          </div>

          <div className="flex-1 h-1 bg-green-300 mx-2 rounded-full" />

          {/* Step 2 - Preparing */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 text-white p-3 rounded-full mb-2 shadow-md">
              <FaUtensils />
            </div>
            <span className="text-sm font-medium text-gray-500">Preparing</span>
          </div>

          <div className="flex-1 h-1 bg-gray-300 mx-2 rounded-full" />

          {/* Step 3 - On the Way */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-300 text-white p-3 rounded-full mb-2 shadow-md">
              <FaTruck />
            </div>
            <span className="text-sm font-medium text-gray-500">On the Way</span>
          </div>
        </div>

        {/* Order Details */}
        <div className="text-left text-gray-700 text-md space-y-2 mb-6">
          <p><strong>Dish:</strong> {order.dishName}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Total:</strong> ${order.price * order.quantity}</p>
          <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-[#57a9c6] hover:bg-[#499ab0] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PlacedOrder;
