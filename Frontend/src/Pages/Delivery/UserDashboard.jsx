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

    axios.get(`http://localhost:8084/api/delivery/user/${userId}`) // Endpoint to fetch deliveries for specific user
      .then(response => {
        // Filter out completed deliveries
        const activeDeliveries = response.data.filter(d => d.status !== 'Completed');
        setDeliveries(activeDeliveries);
      })
      .catch(error => console.error('Error fetching deliveries:', error));
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <div className="p-6">
          <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">My Deliveries</h2>
          {deliveries.length === 0 ? (
            <p className="text-gray-500">No active deliveries found.</p>
          ) : (
            <ul className="space-y-4">
              {deliveries.map(delivery => (
                <li key={delivery.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p><strong>Restaurant:</strong> {delivery.pickupLocation}</p>
                    <p><strong>Delivered Items:</strong></p>
                    <ul className="list-disc pl-5">
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
                  </div>
                  
                  <button
                    onClick={() => navigate(`/track-delivery/${delivery.id}`)}
                    className="ml-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white whitespace-nowrap"
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
    <Footer/>
    </>
  );
}

export default UserDashboard;
