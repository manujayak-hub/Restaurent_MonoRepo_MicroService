import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllDeliveries() {
  const [driver, setDriver] = useState(null);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriverAndDeliveries = async () => {
      setLoading(true);

      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          console.error("No user ID found in local storage!");
          setLoading(false);
          return;
        }

        // Fetch the driver details using the userId
        const driverResponse = await axios.get(`http://localhost:8080/auth/userdetails/${userId}`);
        setDriver(driverResponse.data.userdetails);

        // Fetch deliveries
        const deliveriesResponse = await axios.get("http://localhost:8084/api/delivery"); // Adjust API URL if needed
        const deliveriesData = deliveriesResponse.data;

        // Filter deliveries: Show matching location deliveries and accepted deliveries for the logged-in driver
        const matchedDeliveries = deliveriesData.filter((delivery) => 
          // Show deliveries with matching location OR the ones accepted by the driver
          (delivery.status !== "Completed" && 
            (delivery.pickupLocation.toLowerCase() === driverResponse.data.userdetails.driverbasedlocation.toLowerCase() || 
             delivery.driverId === driverResponse.data.userdetails._id)
          )
        );

        setFilteredDeliveries(matchedDeliveries);
      } catch (error) {
        console.error("Error fetching driver or deliveries:", error);
      }

      setLoading(false);
    };

    fetchDriverAndDeliveries();
  }, []);

  const handleAcceptDelivery = (deliveryId) => {
    axios
      .put(
        `http://localhost:8084/api/delivery/${deliveryId}/accept`,
        {
          driverId: driver._id,
          driverName: driver.firstName,
          driverContact: driver.contactno,
        },
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading deliveries...</div>
      </div>
    );
  }

  if (!filteredDeliveries || filteredDeliveries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">No matching or accepted deliveries found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Pending Deliveries</h2>
          <ul className="space-y-4">
            {filteredDeliveries.map((delivery) => (
              <li
                key={delivery.id}
                className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition flex justify-between items-center" // added flex and justify-between
                onClick={() => handleClickDelivery(delivery.id)} // Make the delivery clickable
              >
                <div>
                  <p><strong>Delivery ID:</strong> {delivery.id}</p>
                  <p><strong>Status:</strong> {delivery.status}</p>
                  <p><strong>Pickup Location:</strong> {delivery.pickupLocation}</p>
                  <p><strong>Dropoff Location:</strong> {delivery.deliveryLocation}</p>
                  <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
                  <li><strong>Delivery Items:</strong></li>
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
  
                {/* Conditionally render the "Accept Delivery" button aligned to the right */}
                {delivery.status === "Pending" && delivery.driverId !== driver._id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptDelivery(delivery.id);
                    }}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  >
                    Accept Delivery
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default AllDeliveries;
