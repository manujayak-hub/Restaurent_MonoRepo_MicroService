import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function AdminDeliveries() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8084/api/delivery')
      .then(res => setDeliveries(res.data))
      .catch(err => console.error("Error fetching deliveries:", err));
  }, []);

  return (
    <>
      <Header />
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <div className="max-w-7xl mx-auto">
    <div className="p-6">
    <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">All Deliveries</h2>

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-100 text-gray-700">
            <tr >
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b">Delivery ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b">Delivery Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b">Delivery Amount</th>
              <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider border-b">Delivery Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map(delivery => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td  className="py-4 px-6 whitespace-nowrap">{delivery.id}</td>
                <td  className="py-4 px-6 whitespace-nowrap">{delivery.status}</td>
                <td  className="py-4 px-6 whitespace-nowrap">{delivery.totalAmount || 'N/A'}</td>
                <td className="py-2 px-4 border-b">
                  <p><strong>Driver Name:</strong> {delivery.driverId || 'Unassigned'}</p>
                  <p><strong>Driver Contact No:</strong> {delivery.driverContact || 'Not Provided'}</p>
                  <p><strong>Restuarant:</strong> {delivery.pickupLocation}</p>
                  <p><strong>Delivered Items:</strong></p>
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
                  <p><strong>Payment Type:</strong> {delivery.paymentType}</p>
                  <p><strong>Destination:</strong> {delivery.deliveryLocation}</p>
                  
                </td>
              </tr>
            ))}
            {deliveries.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default AdminDeliveries;
