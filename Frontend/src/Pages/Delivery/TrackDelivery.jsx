// src/pages/TrackDelivery.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
};

function TrackDelivery() {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [directions, setDirections] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBHRxe8TkbXujFSYLuAIO6dHaiZ_W7IUzM', // replace with your own key
  });

  useEffect(() => {
    axios.get(`http://localhost:5272/api/delivery/${deliveryId}`)
      .then(response => {
        setDelivery(response.data);
        getRoute(response.data.pickupLocation, response.data.deliveryLocation);
      })
      .catch(error => console.error('Error fetching delivery:', error));
  }, [deliveryId]);

  const getRoute = async (pickup, destination) => {
    if (!pickup || !destination) return;

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

  if (!delivery || !isLoaded) {
    return <div>Loading...</div>;
  }

  const status = delivery.status;
  const isAccepted = status === "Accepted" || status === "Completed";
  const isCompleted = status === "Completed";

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">Delivery Tracking</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT SIDE - Delivery Details + Tracking */}
        <div className="space-y-8">
           {/* Delivery Tracking */}
           <div className="p-6 bg-white rounded-lg shadow">
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <input type="checkbox" checked={isAccepted} readOnly className="mr-2" />
                Order Accepted
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked={isAccepted} readOnly className="mr-2" />
                Driver Assigned
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked={isCompleted} readOnly className="mr-2" />
                Order Completed
              </li>
            </ul>
          </div>
          {/* Delivery Details */}
          <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
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
                  <p><strong>Delivery Status:</strong> {delivery.status}</p>
          </div>

         
        </div>

        {/* RIGHT SIDE - Google Map */}
        <div className="rounded overflow-hidden shadow">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: 6.9271, lng: 79.8612 }} // Default center until route is loaded
            zoom={10}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

      </div>
    </div>
  );
}

export default TrackDelivery;
