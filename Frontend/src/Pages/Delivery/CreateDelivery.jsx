// src/pages/CreateDelivery.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CreateDelivery() {
  const [formData, setFormData] = useState({
    orderId: '',
    restaurantId: '',
    deliveryLocation: '',
    paymentType: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5272/api/delivery', formData);
      alert('Delivery created!');
    } catch (err) {
      console.error(err);
      alert('Failed to create delivery');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create Delivery</h2>
      {['orderId', 'restaurantId', 'deliveryLocation', 'paymentType'].map(field => (
        <div key={field} className="mb-4">
          <label className="block mb-1 capitalize">{field}</label>
          <input
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow">Submit</button>
    </form>
  );
}

export default CreateDelivery;
