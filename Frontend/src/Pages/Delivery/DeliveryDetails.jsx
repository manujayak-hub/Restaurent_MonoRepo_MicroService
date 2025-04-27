import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

function DeliveryDetails() {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [directions, setDirections] = useState(null);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBHRxe8TkbXujFSYLuAIO6dHaiZ_W7IUzM', // replace with your key
  });

  useEffect(() => {
    axios.get(`http://localhost:5272/api/delivery/${deliveryId}`)
      .then(response => {
        setDelivery(response.data);
      })
      .catch(error => console.error('Error fetching delivery details:', error));
  }, [deliveryId]);

  useEffect(() => {
    // Check if Google Maps API is loaded and delivery data is available
    if (isLoaded && delivery && delivery.pickupLocation && delivery.deliveryLocation) {
      getRoute(delivery.pickupLocation, delivery.deliveryLocation);
    }
  }, [isLoaded, delivery]);

  const getRoute = async (pickup, destination) => {
    if (!pickup || !destination) return;

    // Make sure the Google Maps API is loaded before calling DirectionsService
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: pickup,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Failed to load directions:', status);
        }
      }
    );
  };

  const handleCompleteDelivery = () => {
    axios
      .put(`http://localhost:5272/api/delivery/${deliveryId}/complete`)
      .then(() => {
        alert("Delivery marked as complete!");
        navigate("/");
      })
      .catch(error => {
        console.error('Error completing delivery:', error);
        alert(error?.response?.data || "Failed to complete delivery.");
      });
  };

  if (!delivery || !isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-20 drop-shadow">Delivery Details</h2>
      <div className="max-w-7xl mx-auto">
        <div className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Side - Details */}
            <div className="flex-1 space-y-4 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
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
              <p><strong>Delivery Location:</strong> {delivery.deliveryLocation}</p>

              {delivery.status !== "Completed" && (
                <div className="flex justify-center">
                  <button
                    onClick={handleCompleteDelivery}
                    className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-7"
                  >
                    Complete Delivery
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Map */}
            <div className="flex-1 rounded overflow-hidden shadow ">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={{ lat: 6.9271, lng: 79.8612 }}
                zoom={10}
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetails;
