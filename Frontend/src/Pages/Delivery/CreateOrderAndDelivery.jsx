import React, { useState } from 'react';
import axios from 'axios';

function CreateOrderAndDelivery() {
  const [orderData, setOrderData] = useState({
    customerName: '',
    pickupLocation: '',
    deliveryLocation: '',
    paymentType: 'Cash',
    items: [{ name: '', quantity: 1 }], // Items added here
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...orderData.items];
    updatedItems[index][name] = value;
    setOrderData({ ...orderData, items: updatedItems });
  };

  const handleAddItem = () => {
    setOrderData({
      ...orderData,
      items: [...orderData.items, { name: '', quantity: 1 }],
    });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = orderData.items.filter((_, i) => i !== index);
    setOrderData({ ...orderData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Create Order
      const orderResponse = await axios.post('http://localhost:5112/api/order', {
        customerId: '67f67b1eb38a985525bdbf6b', // Example customer ID
        deliveryLocation: orderData.deliveryLocation,
       
        paymentMethod: orderData.paymentType,
        restaurantId: 'your-restaurant-id-here',
        items: orderData.items, // Send items in the order data
      });

      console.log('Order created:', orderResponse.data);

      // 2. Create Delivery linked to the order
      const deliveryResponse = await axios.post('http://localhost:5272/api/delivery', {
        customerId: '67f67b1eb38a985525bdbf6b',
        deliveryLocation: orderData.deliveryLocation,
        paymentType: orderData.paymentType,
         // Assuming your Order API returns orderId
      });

      console.log('Delivery created:', deliveryResponse.data);

      setMessage('Order and Delivery created successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Order & Delivery</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={orderData.customerName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">Delivery Location</label>
            <input
              type="text"
              name="deliveryLocation"
              value={orderData.deliveryLocation}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Type</label>
            <select
              name="paymentType"
              value={orderData.paymentType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Items</label>
            {orderData.items.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-3">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(e, index)}
                  placeholder="Item name"
                  required
                  className="w-2/3 border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(e, index)}
                  min="1"
                  required
                  className="w-1/3 border border-gray-300 rounded px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-800"
            >
              Add Another Item
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Creating...' : 'Create Order and Delivery'}
          </button>
        </form>

        {message && <div className="mt-4 text-center font-medium">{message}</div>}
      </div>
    </div>
  );
}

export default CreateOrderAndDelivery;
