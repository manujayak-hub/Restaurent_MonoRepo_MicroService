// src/pages/CompletedDeliveries.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import axios from 'axios'; // Import axios for API calls
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function CompletedDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const fetchCompletedDeliveries = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Get user ID from localStorage

        if (!userId) {
          console.error("No user ID found in local storage!");
          setLoading(false);
          return;
        }

        // Fetch completed deliveries for the logged-in user
        const deliveriesResponse = await axios.get(`http://localhost:8084/api/delivery/completed/${userId}`); // Assuming there's an endpoint to fetch completed deliveries for a user
        const deliveriesData = deliveriesResponse.data;

        if (deliveriesData && deliveriesData.length > 0) {
          setDeliveries(deliveriesData);
        } else {
          console.log("No completed deliveries found for this user.");
        }
      } catch (error) {
        console.error("Error fetching completed deliveries:", error);
      }
      setLoading(false);
    };

    fetchCompletedDeliveries();
  }, []); // Empty dependency array to fetch data only once

  const handleDeliveryClick = (deliveryId) => {
    navigate(`/track-delivery/${deliveryId}`); // Navigate to delivery tracking page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading completed deliveries...</div>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Completed Deliveries</h2>

        {deliveries.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg text-red-500 font-semibold bg-white p-6 rounded-lg shadow-md max-w-md">
              No completed deliveries found. You can check back later or contact support if you believe this is an issue.
            </div>
          </div>
        ) : (
          <ul className="space-y-2">
            {deliveries.map((d) => (
              <li
                key={d.id}
                onClick={() => handleDeliveryClick(d.id)} // Navigate to the delivery details page
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
              >
                <p><strong>Payment Type:</strong> {d.paymentType}</p>
                <p><strong>Status:</strong> {d.status}</p>
                <p><strong>Pickup Location:</strong> {d.pickupLocation}</p>
                <p><strong>Dropoff Location:</strong> {d.deliveryLocation}</p>
                <p><strong>Completed On:</strong> {new Date(d.completedDate).toLocaleDateString()}</p> {/* Example of showing completion date */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default CompletedDeliveries;
