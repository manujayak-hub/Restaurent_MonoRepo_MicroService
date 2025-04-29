import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasActiveDelivery, setHasActiveDelivery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriverAndDeliveries = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("No user ID found!");
          setLoading(false);
          return;
        }

        // Fetch driver details
        const driverResponse = await axios.get(`http://localhost:8080/auth/userdetails/${userId}`);
        const driverData = driverResponse.data.userdetails;
        setDriver(driverData);

        // Fetch deliveries
        const deliveriesResponse = await axios.get("http://localhost:8084/api/delivery");
        const deliveriesData = deliveriesResponse.data;

        
        const activeDeliveries = deliveriesData.filter((delivery) => delivery.status !== "Completed");
        setDeliveries(activeDeliveries);

        // Check if driver has active
        const driverHasActive = deliveriesData.some(
          (delivery) => delivery.driverId === driverData._id && delivery.status !== "Completed"
        );
        setHasActiveDelivery(driverHasActive);
      } catch (error) {
        console.error("Error fetching driver or deliveries:", error);
      }
      setLoading(false);
    };

    fetchDriverAndDeliveries();
  }, []);

  const handleAcceptDelivery = (deliveryId) => {
    if (hasActiveDelivery) {
      alert("You already have an active delivery. Complete it before accepting another.");
      return;
    }

    axios
      .put(`http://localhost:8084/api/delivery/${deliveryId}/accept`, {
        driverId: driver._id,
        driverName: driver.firstName,
        driverContact: driver.contactno,
      })
      .then(() => {
        navigate(`/delivery-details/${deliveryId}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error accepting delivery:", error);
        alert(error?.response?.data || "Failed to accept delivery.");
      });
  };

  const handleSetPending = (deliveryId) => {
    axios
      .put(`http://localhost:8084/api/delivery/${deliveryId}/setPending`, {
        driverId: null,
        driverName: null,
        driverContact: null,
        status: "Pending",
      })
      .then(() => {
        alert("Delivery set back to Pending!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error setting delivery to pending:", error);
        alert(error?.response?.data || "Failed to set delivery pending.");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Failed to load driver profile.</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-6 bg-gradient-to-tr from-blue-100 via-white to-orange-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side - Driver Profile */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Driver Profile</h2>
            <div className="space-y-4 text-gray-700 mt-10">
              <div><strong>First Name:</strong> {driver.firstName}</div>
              <div><strong>Last Name:</strong> {driver.lastName}</div>
              <div><strong>Email:</strong> {driver.email}</div>
              <div><strong>Role:</strong> {driver.role}</div>
              <div><strong>Contact No:</strong> {driver.contactno || "N/A"}</div>
              <div><strong>Based Location:</strong> {driver.driverbasedlocation || "N/A"}</div>
            </div>
          </div>

          {/* Right Side - Deliveries */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[#e87c21] drop-shadow">New Deliveries</h2>
            {/* Button to navigate to completed deliveries */}
            <button
              onClick={() => navigate("/Drivercomplete")}
              className="absolute top-30 right-50 bg-gradient-to-r from-[#57a9c6] to-[#7fc7e0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
             Completed Deliveries
            </button>
            <ul className="space-y-4 list-none">
            {deliveries.map((delivery) => {
  const isAssignedToDriver = delivery.driverId === driver._id;

  return (
    <li
      key={delivery.id}
      onClick={() => {
        if (isAssignedToDriver) {
          navigate(`/delivery-details/${delivery.id}`);
        }
      }}
      className={`bg-white rounded-3xl shadow-xl hover:shadow-2xl border-t-8 border-[#7fc7e0] p-4 transition-all duration-300 hover:scale-105  ${
        isAssignedToDriver ? 'hover:shadow-xl hover:cursor-pointer hover:bg-blue-50' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p><strong>Delivery ID:</strong> {delivery.id}</p>
          <p><strong>Status:</strong> {delivery.status}</p>
          <p><strong>Pickup:</strong> {delivery.pickupLocation}</p>
          <p><strong>Dropoff:</strong> {delivery.deliveryLocation}</p>
          <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
        </div>

        <div className="flex flex-col gap-2">
          
          {delivery.status === "Pending" && delivery.driverId !== driver._id && !hasActiveDelivery && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAcceptDelivery(delivery.id);
              }}
              className="bg-gradient-to-r from-[#7fc7e0] to-[#57a9c6] hover:from-[#68b8d8] hover:to-[#499ab0] text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Accept
            </button>
          )}


         
          {/* Disabled if already has active */}
          {delivery.status === "Pending" && delivery.driverId !== driver._id && hasActiveDelivery && (
            <button
              disabled
              className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md cursor-not-allowed"
            >
              Complete Current Delivery
            </button>
          )}

          {/* Set Pending */}
          {delivery.driverId === driver._id && delivery.status !== "Completed" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSetPending(delivery.id);
              }}
              className="bg-gradient-to-r from-red-300 to-red-400 hover:from-red-300 hover:to-red-400 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Unset
            </button>
          )}
        </div>
      </div>
    </li>
  );
})}
</ul>

          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default DriverProfile;
