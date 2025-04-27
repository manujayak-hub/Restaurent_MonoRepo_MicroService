import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl font-semibold mb-4">Delivery Dashboard</h1>
        
        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link to="/all" className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600">
            All Deliveries
          </Link>
          <Link to="/completed" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
            Completed Deliveries
          </Link>
          <Link to="/create" className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600">
            Create Delivery
          </Link>
          <Link to="/userdashboard" className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600">
            User Delivery
          </Link>
          <Link to="/admin-deliveries" className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600">
            Admin Dashboard
          </Link>
          <Link to="/DriverDeliveries" className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600">
            DriverDelivery
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
