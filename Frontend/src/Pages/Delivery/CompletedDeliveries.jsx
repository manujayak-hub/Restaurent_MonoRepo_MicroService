// src/pages/CompletedDeliveries.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import { getCompletedDeliveries } from '../../Services/Delivery'; // import the service function

function CompletedDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate(); // initialize navigate

  useEffect(() => {
    const fetchCompletedDeliveries = async () => {
      try {
        const data = await getCompletedDeliveries(); // get deliveries from service
        setDeliveries(data);
      } catch (error) {
        console.error("Error fetching completed deliveries:", error);
      }
    };

    fetchCompletedDeliveries();
  }, []);

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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CompletedDeliveries;
