import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function AllDeliveries() {
  const [driver, setDriver] = useState(null);
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveDelivery, setHasActiveDelivery] = useState(false);
  const navigate = useNavigate();

  const fetchDriverAndDeliveries = async () => {
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("No user ID found in local storage!");
        setLoading(false);
        return;
      }

      // Fetch driver details
      const driverResponse = await axios.get(`http://localhost:8080/auth/userdetails/${userId}`);
      const driverData = driverResponse.data.userdetails;
      setDriver(driverData);

      // Fetch all deliveries
      const deliveriesResponse = await axios.get("http://localhost:8084/api/delivery");
      const deliveriesData = deliveriesResponse.data;

      // Only filter out completed deliveries
      const activeDeliveries = deliveriesData.filter((delivery) => delivery.status !== "Completed");

      setFilteredDeliveries(activeDeliveries);

      // Check if the driver already has an active delivery
      const driverHasActive = deliveriesData.some(
        (delivery) => delivery.driverId === driverData._id && delivery.status !== "Completed"
      );
      setHasActiveDelivery(driverHasActive);

    } catch (error) {
      console.error("Error fetching driver or deliveries:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDriverAndDeliveries();
  }, []);

  const handleAcceptDelivery = (deliveryId) => {
    if (hasActiveDelivery) {
      alert("You already have an active delivery. Complete it before accepting a new one.");
      return;
    }

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
        fetchDriverAndDeliveries(); // refresh after accepting
        navigate(`/delivery-details/${deliveryId}`);
      })
      .catch((error) => {
        console.error("Error accepting delivery: ", error);
        alert(error?.response?.data || "Failed to accept delivery.");
      });
  };

  const handleSetPending = (deliveryId) => {
    axios
      .put(
        `http://localhost:8084/api/delivery/${deliveryId}/setPending`,
        {
          driverId: null,
          driverName: null,
          driverContact: null,
          status: "Pending",
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        alert("Delivery set back to Pending!");
        fetchDriverAndDeliveries(); // refresh after setting pending
      })
      .catch((error) => {
        console.error("Error setting delivery to pending: ", error);
        alert(error?.response?.data || "Failed to set delivery pending.");
      });
  };

  const handleClickDelivery = (deliveryId, status) => {
    if (status !== "Pending") {
      navigate(`/delivery-details/${deliveryId}`);
    }
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
        <div className="text-lg text-red-500">No active deliveries found.</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-center text-[#e87c21] mb-8 drop-shadow">
              Pending Deliveries
            </h2>
            
            <ul className="space-y-4">
              {filteredDeliveries.map((delivery) => (
                <li
                  key={delivery.id}
                  className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border-t-8 border-[#7fc7e0] p-4 transition-all duration-300 hover:scale-105 flex justify-between items-center"
                  onClick={() => handleClickDelivery(delivery.id, delivery.status)}
                >
                  <div>
                    <p><strong>Delivery ID:</strong> {delivery.id}</p>
                    <p><strong>Status:</strong> {delivery.status}</p>
                    <p><strong>Pickup Location:</strong> {delivery.pickupLocation}</p>
                    <p><strong>Dropoff Location:</strong> {delivery.deliveryLocation}</p>
                    <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
                    <p><strong>Delivery Items:</strong></p>
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

                  {/* Accept Button */}
                  {delivery.status === "Pending" && delivery.driverId !== driver._id && !hasActiveDelivery && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAcceptDelivery(delivery.id);
                      }}
                      className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Accept Delivery
                    </button>
                  )}

                  {/* Disabled Accept Button if driver has active */}
                  {delivery.status === "Pending" && delivery.driverId !== driver._id && hasActiveDelivery && (
                    <button
                      disabled
                      className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md cursor-not-allowed"
                    >
                      Complete current delivery first
                    </button>
                  )}

                  {/* Set Pending Button if delivery accepted by current driver */}
                  {delivery.driverId === driver._id && delivery.status !== "Completed" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetPending(delivery.id);
                      }}
                      className="bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ml-4"
                    >
                      Set Pending
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllDeliveries;
