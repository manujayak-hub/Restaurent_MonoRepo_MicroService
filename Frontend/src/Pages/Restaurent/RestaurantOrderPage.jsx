import React, { useState } from "react";
import { useNavigate ,useLocation } from "react-router-dom";  // Import useNavigate for React Router v6
import { FaMapMarkerAlt, FaPhoneAlt, FaUtensils, FaStar, FaLeaf, FaHamburger, FaShoppingCart } from "react-icons/fa";
import OrderService from '../../Services/OrderService'; 

const RestaurantOrderPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook  
   const location = useLocation();
  const orderdetails = location.state || {}; // Get order details from location state
  const cusid = localStorage.getItem("userId"); 

  console.log(orderdetails);

  // State to hold order data
  const [orderData, setOrderData] = useState({
    itemId: orderdetails.id , // Ensure this is the correct ItemId
    dishName: orderdetails.dishName,
    price: orderdetails.price || 0,
    ingredient: orderdetails.ingredient || '',
    rating: orderdetails.rating || 0,
    vegNonveg: orderdetails.vegNonveg || '',
    imgUrl: orderdetails.imgUrl || '',
    restaurantId: orderdetails.resid || '', // Pass the restaurant ID
    quantity: 1, // Set initial quantity to 1
    deliveryAddress: '', // New field for delivery address
    paymentMethod: '', // New field for payment method
    customerId: '', // New field for customer ID
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Constructing the items array as required
    const items = [
      {
        itemId: orderData.itemId, // Ensure this is the correct ItemId
        name: orderData.dishName, // Ensure this is the correct Name
        quantity: orderData.quantity,
        price: orderData.price,
      },
    ];
  
    const requestBody = {
      customerId: cusid,
      restaurantId: orderData.restaurantId,
      items: items, // Pass the items array here
      deliveryAddress: orderData.deliveryAddress,
      totalAmount: orderData.price * orderData.quantity, // Calculate total amount
      paymentMethod: orderData.paymentMethod,
    };
  
    try {
      // Call the create method from OrderService with the new request body
      const response = await OrderService.create(requestBody);
      console.log('Order placed successfully:', response.data);
      
      // Show success alert
      alert('Order placed successfully!');

      // Wait for a couple of seconds before navigating back
      setTimeout(() => {
        navigate(-1);  // Go back to the previous page
      }, 1000);
  
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  return (
    <div className="order-page bg-gradient-to-r from-[#a6c1ee] via-[#e6d4c6] to-[#e87c21] min-h-screen py-12 px-6 sm:px-8">
      <h2 className="text-4xl font-extrabold text-center text-[#e87c21] mb-8 drop-shadow">
        My Cart
      </h2>

      {/* Order Details Section */}
      <div className="order-details bg-white rounded-xl shadow-lg p-8 mb-10 max-w-4xl mx-auto">
        <div className="flex items-center">
          <img
            src={orderdetails.imgUrl}
            alt={orderdetails.dishName}
            className="w-48 h-48 object-cover rounded-lg mr-8"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#333] mb-4">{orderdetails.dishName}</h3>
            <p className="text-sm text-gray-600 mb-2">{orderdetails.ingredient}</p>
            <p className="text-lg text-gray-800 mb-2"><strong>Price:</strong> ${orderdetails.price}</p>
            <p className="flex items-center text-yellow-500 mb-2">
              <FaStar className="mr-1" /> {orderdetails.rating} ⭐
            </p>
            <p className="text-sm text-gray-700">
              <strong>Type:</strong> 
              {orderdetails.vegNonveg === 'veg' ? (
                <><FaLeaf className="mr-1 text-green-500" /> Vegetarian</>
              ) : (
                <><FaHamburger className="mr-1 text-red-500" /> Non-Vegetarian</>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Order Form Section */}
      <div className="order-form bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-[#333] mb-6">Delivery & Payment Information</h3>

        <label className="block mb-4">
          <span className="text-lg font-semibold text-gray-700">Delivery Address:</span>
          <input
            type="text"
            name="deliveryAddress"
            value={orderData.deliveryAddress}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7fc7e0] focus:border-[#57a9c6] transition-all"
            placeholder="Enter your delivery address"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-semibold text-gray-700">Payment Method:</span>
          <select
            name="paymentMethod"
            value={orderData.paymentMethod}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7fc7e0] focus:border-[#57a9c6] transition-all"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-lg font-semibold text-gray-700">Quantity:</span>
          <input
            type="number"
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
            min="1"
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7fc7e0] focus:border-[#57a9c6] transition-all"
            required
          />
        </label>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <FaShoppingCart className="mr-2" /> Place Order
        </button>
      </div>
    </div>
  );
};

export default RestaurantOrderPage;
