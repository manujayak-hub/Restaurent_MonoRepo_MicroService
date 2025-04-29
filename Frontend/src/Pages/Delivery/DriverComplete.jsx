import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompletedDeliveries } from '../../Services/Delivery';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

function Drivercomplete() {
  const [deliveries, setDeliveries] = useState([]);
  const [driver, setDriver] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDriverAndDeliveries = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('No user ID found in local storage');
          return;
        }

        const driverResponse = await fetch(`http://localhost:8080/auth/userdetails/${userId}`);
        const driverData = await driverResponse.json();
        setDriver(driverData.userdetails);

        const data = await getCompletedDeliveries();
        const driverCompletedDeliveries = data.filter(delivery => delivery.driverId === driverData.userdetails._id);
        setDeliveries(driverCompletedDeliveries);
      } catch (error) {
        console.error('Error fetching completed deliveries:', error);
      }
    };

    fetchDriverAndDeliveries();
  }, []);

  const handleDeliveryClick = (deliveryId) => {
    navigate(`/track-delivery/${deliveryId}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-[#e87c21] mb-8 drop-shadow">Completed Deliveries</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-[#7fc7e0] text-white">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Delivery ID</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Payment Type</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Amount</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold uppercase">Delivery Details</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.length > 0 ? deliveries.map((d, index) => (
                  <tr
                  >
                    <td className="py-4 px-6 border-b">{d.id}</td>
                    <td className="py-4 px-6 border-b">{d.paymentType}</td>
                    <td className="py-4 px-6 border-b">Rs.{d.totalAmount || 'N/A'}</td>
                    <td className="py-4 px-6 border-b">
                      <div>
                        <p><strong>Pickup:</strong> {d.pickupLocation}</p>
                        <p><strong>Dropoff:</strong> {d.deliveryLocation}</p>
                        <p><strong>Delivery Items:</strong></p>
                        <ul className="list-disc pl-5">
                          {d.items && d.items.length > 0 ? (
                            d.items.map((item, index) => (
                              <li key={index}>
                                {item.name} - Quantity: {item.quantity}
                              </li>
                            ))
                          ) : (
                            <li>Unassigned</li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-500">
                      No completed deliveries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Drivercomplete;
