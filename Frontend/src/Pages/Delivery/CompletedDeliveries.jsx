import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function CompletedDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCompletedDeliveries = async () => {
      try {
        const userId = localStorage.getItem("userId"); 

        if (!userId) {
          console.error("No user ID found in local storage!");
          setLoading(false);
          return;
        }

        // Fetch completed deliveries for the logged-in user
        const deliveriesResponse = await axios.get(`http://localhost:8084/api/delivery/completed/${userId}`); 
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
    navigate(`/track-delivery/${deliveryId}`); 
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
        <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">Completed Deliveries</h2>

        {deliveries.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-lg text-red-500 font-semibold bg-white p-6 rounded-lg shadow-md max-w-md">
              No completed deliveries found. You can check back later or contact support if you believe this is an issue.
            </div>
          </div>
        ) : (
          <ul className="space-y-5">
            {deliveries.map((d) => (
              <li
              
                className="bg-white p-4 rounded-lg shadow  border-t-8 border-[#7fc7e0]  "
              >
                
                <p><strong>Pickup Location:</strong> {d.pickupLocation}</p>
                <p><strong>Dropoff Location:</strong> {d.deliveryLocation}</p>
                <p><strong>Delivery Items:</strong></p>
                      <ul className="list-disc pl-10">
                        {d.items && d.items.length > 0 ? (
                          d.items.map((item, index) => (
                            <li key={index}>
                              {item.name} - Quantity: {item.quantity}
                            </li>
                          ))
                        ) : (
                          <li>Unassigned</li>
                        )}
                      </ul>
                <p><strong>Total Amount:</strong> Rs.{d.totalAmount}</p>
                <p><strong>Payment Type:</strong> {d.paymentType}</p>
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
