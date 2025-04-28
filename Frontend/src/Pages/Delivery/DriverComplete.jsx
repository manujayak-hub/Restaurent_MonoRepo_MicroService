// src/pages/CompletedDeliveries.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import { getCompletedDeliveries } from '../../Services/Delivery'; // import the service function

function Driveromplete() {
  const [deliveries, setDeliveries] = useState([]);
  const [driver, setDriver] = useState(null); // state for driver data
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const fetchDriverAndDeliveries = async () => {
      try {
        // Fetch the driver details from localStorage (assuming the driver info is saved there)
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('No user ID found in local storage');
          return;
        }

        // Assuming you have an API to fetch the driver info (you can adjust this to your actual API call)
        const driverResponse = await fetch(`http://localhost:8080/auth/userdetails/${userId}`);
        const driverData = await driverResponse.json();
        setDriver(driverData.userdetails);

        // Fetch the completed deliveries
        const data = await getCompletedDeliveries();
        
        // Filter deliveries assigned to the logged-in driver
        const driverCompletedDeliveries = data.filter(delivery => delivery.driverId === driverData.userdetails._id);
        setDeliveries(driverCompletedDeliveries);
      } catch (error) {
        console.error('Error fetching completed deliveries:', error);
      }
    };

    fetchDriverAndDeliveries();
  }, []); // empty dependency array ensures this effect runs once on mount

  const handleDeliveryClick = (deliveryId) => {
    navigate(`/track-delivery/${deliveryId}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Completed Deliveries</h2>
        <ul className="space-y-2">
          {deliveries.map(d => (
            <li
              key={d.id}
              onClick={() => handleDeliveryClick(d.id)}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
            >
              <p><strong>Payment Type:</strong> {d.paymentType}</p>
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Pickup Location:</strong> {d.pickupLocation}</p>
              <p><strong>Dropoff Location:</strong> {d.dropoffLocation}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Driveromplete;
