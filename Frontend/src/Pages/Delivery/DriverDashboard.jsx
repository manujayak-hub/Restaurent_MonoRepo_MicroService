import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function DriverDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [driverId, setDriverId] = useState(null);

  useEffect(() => {
    
    const storedDriverId = localStorage.getItem('userId');
    setDriverId(storedDriverId);

    if (storedDriverId) {
      // Fetch deliveries assigned to the driver
      axios.get(`http://localhost:8084/api/delivery/driver/${storedDriverId}`)
        .then(response => {
          setDeliveries(response.data);
        })
        .catch(error => {
          console.error('Error fetching driver deliveries:', error);
        });
    }
  }, []);

  return (
    <>
    <Header/>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Deliveries Assigned to You</h2>

          {deliveries.length === 0 ? (
            <p className="text-gray-500 text-center">You have no active deliveries.</p>
          ) : (
            <ul className="space-y-4">
              {deliveries.map(delivery => (
                <li key={delivery.id} className="bg-white p-4 rounded-lg shadow">
                  <p><strong>Status:</strong> {delivery.status}</p>
                  <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
                  <p><strong>Pickup Location:</strong> {delivery.pickupLocation}</p>
                  <p><strong>Delivery Location:</strong> {delivery.deliveryLocation}</p>

                  {/* Button to Track Delivery */}
                  <button
                    onClick={() => alert(`Tracking delivery ID: ${delivery.id}`)} 
                    className="mt-3 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Track Delivery
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

export default DriverDashboard;
