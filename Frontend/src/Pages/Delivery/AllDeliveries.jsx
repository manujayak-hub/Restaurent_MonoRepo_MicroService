import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AllDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5272/api/delivery')
      .then(response => setDeliveries(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAcceptDelivery = (deliveryId) => {
    axios
      .put(`http://localhost:5272/api/delivery/${deliveryId}/accept`, 
        { id: "driver123" },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        navigate(`/delivery-details/${deliveryId}`);
      })
      .catch((error) => {
        console.error("Error accepting delivery: ", error);
        alert(error?.response?.data || "Failed to accept delivery.");
      });
  };

  const handleClickDelivery = (deliveryId) => {
    navigate(`/delivery-details/${deliveryId}`);
  };

  // Show only Pending or Accepted deliveries
  const relevantDeliveries = deliveries.filter(d => 
    d.status === "Pending" || d.status === "Accepted"
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Pending / Accepted Deliveries</h2>
      {relevantDeliveries.length === 0 ? (
        <p className="text-gray-500">No pending or accepted deliveries found.</p>
      ) : (
        <ul className="space-y-4">
          {relevantDeliveries.map(d => (
            <li
              key={d.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleClickDelivery(d.id)}
            >
              <p><strong>Status:</strong> {d.status}</p>
              <p><strong>Payment Type:</strong> {d.paymentType}</p>

              {d.status === "Pending" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptDelivery(d.id);
                  }}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                >
                  Accept Delivery
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </div>
  );
}

export default AllDeliveries;
