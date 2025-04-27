// src/pages/DriverDeliveries.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DriverDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [driverLocation, setDriverLocation] = useState(""); 
  const [matchingDeliveries, setMatchingDeliveries] = useState([]);

  // Fetch driver location from the backend
  useEffect(() => {
    const fetchDriverLocation = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/userdetails', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Get the token from storage
          }
        });

        const driverLocation = response.data.userdetails.driverbasedlocation;
        setDriverLocation(driverLocation);
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };

    fetchDriverLocation();
  }, []);

  // Fetch all deliveries and filter based on driver location
  useEffect(() => {
    axios.get('http://localhost:5272/api/delivery')
      .then(async (res) => {
        const allDeliveries = res.data;

        // Now for each delivery, fetch the restaurant details
        const deliveriesWithRestaurantLocation = await Promise.all(
          allDeliveries.map(async (delivery) => {
            try {
              const orderResponse = await axios.get(`http://localhost:5112/api/order/${delivery.orderId}`);
              const restaurantId = orderResponse.data.restaurantId;

              const restaurantResponse = await axios.get(`http://localhost:8081/api/restaurant/${restaurantId}`);
              const restaurantLocation = restaurantResponse.data.location;

              return {
                ...delivery,
                restaurantLocation,
              };
            } catch (err) {
              console.error('Error fetching restaurant or order info:', err);
              return delivery;
            }
          })
        );

        setDeliveries(deliveriesWithRestaurantLocation);
      })
      .catch(err => console.error("Error fetching deliveries:", err));
  }, []);

  // Filter deliveries based on driver's location
  useEffect(() => {
    const filtered = deliveries.filter(delivery => 
      delivery.restaurantLocation &&
      delivery.restaurantLocation.toLowerCase().includes(driverLocation.toLowerCase())
    );
    setMatchingDeliveries(filtered);
  }, [deliveries, driverLocation]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Deliveries Matching Your Location</h2>

      <div className="overflow-x-auto">
        {matchingDeliveries.length === 0 ? (
          <p className="text-gray-500">No deliveries match your location.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">Delivery ID</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Restaurant Location</th>
                <th className="py-3 px-4 border-b text-left">Delivery Details</th>
              </tr>
            </thead>
            <tbody>
              {matchingDeliveries.map(delivery => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{delivery.id}</td>
                  <td className="py-2 px-4 border-b">{delivery.status}</td>
                  <td className="py-2 px-4 border-b">{delivery.restaurantLocation}</td>
                  <td className="py-2 px-4 border-b">
                    <p><strong>Pickup:</strong> {delivery.pickupLocation}</p>
                    <p><strong>Destination:</strong> {delivery.deliveryLocation}</p>
                    <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}

export default DriverDeliveries;
