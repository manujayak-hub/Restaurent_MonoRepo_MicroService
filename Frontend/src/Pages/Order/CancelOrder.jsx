import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderService from '../../Services/OrderService';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  const cancellationReasons = [
    'Changed my mind',
    'Found a better deal',
    'Ordered by mistake',
    'Delivery time too long',
    'Other'
  ];

  const handleCancel = async () => {
    try {
      await OrderService.delete(id);
      alert('Order has been cancelled successfully.');
      navigate('/mycart');
    } catch (error) {
      console.error('Failed to cancel order:', error);
      alert('Failed to cancel the order. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-tr from-red-100 via-white to-red-50 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-3xl font-bold text-center text-red-600">Cancel Order</h2>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Why are you cancelling this order?</h3>
            <div className="space-y-2">
              {cancellationReasons.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="radio"
                    name="reason"
                    value={option}
                    checked={reason === option}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Additional message (optional):</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-red-200"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
            >
              Go Back
            </button>
            <button
              onClick={handleCancel}
              disabled={!reason}
              className={`px-6 py-2 font-semibold text-white rounded-xl transition ${
                reason
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-red-300 cursor-not-allowed'
              }`}
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CancelOrder;
