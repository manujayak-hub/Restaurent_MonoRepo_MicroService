import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        const uid = localStorage.getItem("userId");
        if (!uid) {
          console.error("No user ID found!");
          setLoading(false);
          return;
        }

        // Fetch user details using UID from localStorage
        const response = await axios.get(`http://localhost:8080/auth/userdetails/${uid}`);
        setDriver(response.data.userdetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching driver profile:", error);
        setLoading(false);
      }
    };

    fetchDriverProfile();
  }, []);

  const handleNavigateToDashboard = () => {
    navigate("/all"); // Navigate to the dashboard page
  };

  const handleNavigateToCompletedDelivery = () => {
    navigate("/DriverDeliveries"); // Navigate to the dashboard page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-semibold">Loading driver profile...</div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-100 via-white to-orange-100">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Driver Profile</h2>
        <div className="space-y-4 text-gray-700">
          <div><strong>First Name:</strong> {driver.firstName}</div>
          <div><strong>Last Name:</strong> {driver.lastName}</div>
          <div><strong>Email:</strong> {driver.email}</div>
          <div><strong>Role:</strong> {driver.role}</div>
          <div><strong>Contact No:</strong> {driver.contactno || "N/A"}</div>
          
          <div><strong>Based Location:</strong> {driver.driverbasedlocation || "N/A"}</div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleNavigateToDashboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Deliveries
          </button>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleNavigateToCompletedDelivery}
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Completed Deliveries
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
