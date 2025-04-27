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
      
      // Optionally, navigate to the order confirmation page
      navigate('/order-confirmation', { state: { orderId: response.data.id } });
  
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  return (
    <div className="order-page">
      <h2>Restaurant Order</h2>
      
      <div className="order-details">
        <img src={orderdetails.imgUrl} alt={orderdetails.dishName} />
        <h3>{orderdetails.dishName}</h3>
        <p>{orderdetails.ingredient}</p>
        <p><strong>Price:</strong> ${orderdetails.price}</p>
        <p><strong>Rating:</strong> {orderdetails.rating} <FaStar /></p>
        <p><strong>Type:</strong> {orderdetails.vegNonveg === 'veg' ? <FaLeaf /> : <FaHamburger />}</p>
      </div>

      {/* Input fields for Customer ID, Payment Method, and Delivery Address */}
      <div className="order-form">
        
        
        <label>
          Delivery Address:
          <input
            type="text"
            name="deliveryAddress"
            value={orderData.deliveryAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Payment Method:
          <select
            name="paymentMethod"
            value={orderData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Method</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
        </label>

        {/* Optionally, add quantity input */}
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={orderData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </label>
      </div>

      {/* Place Order Button */}
      <button onClick={handlePlaceOrder} className="place-order-btn">
        <FaShoppingCart /> Place Order
      </button>
    </div>
  );
};

export default RestaurantOrderPage;
