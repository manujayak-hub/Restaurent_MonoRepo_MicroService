// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function UserDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get logged-in user's ID from localStorage

    if (!userId) {
      console.error("User not logged in or no user ID found.");
      return;
    }

    axios.get(`http://localhost:8084/api/delivery/user/${userId}`) // Fetch deliveries for specific user
      .then(response => {
        // Filter out completed deliveries
        const activeDeliveries = response.data.filter(d => d.status !== 'Completed');
        setDeliveries(activeDeliveries);
      })
      .catch(error => console.error('Error fetching deliveries:', error));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-7xl mx-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">
                My Deliveries
              </h2>

              {/* Button to navigate to completed deliveries */}
              <button
                onClick={() => navigate('/completed')}
                className="flex items-center bg-gradient-to-r from-[#df9f6b] to-[#e87c21] hover:from-[#df9f6b] hover:to-[#e87c21] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                Completed Deliveries
              </button>
            </div>

            {deliveries.length === 0 ? (
              <p className="text-gray-500">No active deliveries found.</p>
            ) : (
              <ul className="space-y-7 list-none">
                {deliveries.map(delivery => (
                  <li
                    key={delivery.id}
                    className="bg-white p-4 rounded-lg shadow flex justify-between items-center hover:shadow-2xl border-t-8 border-[#7fc7e0] transition-all duration-300 hover:scale-105"
                  >
                    <div>
                      <p><strong>Restaurant:</strong> {delivery.pickupLocation}</p>
                      <p><strong>Delivery Items:</strong></p>
                      <ul className="list-disc pl-10">
                        {delivery.items && delivery.items.length > 0 ? (
                          delivery.items.map((item, index) => (
                            <li key={index}>
                              {item.name} - Quantity: {item.quantity}
                            </li>
                          ))
                        ) : (
                          <li>Unassigned</li>
                        )}
                      </ul>
                      <p><strong>Total Amount:</strong> Rs.{delivery.totalAmount}</p>
                    </div>

                    <button
                      onClick={() => navigate(`/track-delivery/${delivery.id}`)}
                      className="flex items-center bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Track
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserDashboard;
