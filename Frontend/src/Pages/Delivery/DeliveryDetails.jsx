import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import OrderService from '../../Services/OrderService'; // Make sure the path to your OrderService is correct
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";

const containerStyle = {
  width: '100%',
  height: '500px',
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function DeliveryDetails() {
  const { deliveryId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [deliveryCoords, setDeliveryCoords] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [eta, setEta] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8084/api/delivery/${deliveryId}`)
      .then(response => {
        console.log("Delivery API Response:", response.data);
        setDelivery(response.data);
        setOrderId(response.data.orderId);  
        getCoordinates(response.data.pickupLocation, setPickupCoords);
        getCoordinates(response.data.deliveryLocation, setDeliveryCoords);
      })
      .catch(error => console.error('Error fetching delivery details:', error));
  }, [deliveryId]);

  const getCoordinates = (address, setter) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          console.error('No coordinates found for address:', address);
        }
      })
      .catch(err => console.error('Error fetching coordinates:', err));
  };

  const handleCompleteDelivery = async () => {
    try {
      // First, update the Order status
      await OrderService.updaterecord(orderId, 'Completed');
      console.log('Order status updated.');
  
      // Then, update the Delivery status using the PUT method
      const response = await axios.put(
        `http://localhost:8084/api/delivery/${deliveryId}/complete`
      );
      console.log('Delivery status updated:', response.data);
  
      alert("Delivery and Order marked as complete!");
      navigate("/all"); // Navigate after both updates
    } catch (error) {
      console.error('Error completing delivery:', error.response?.data || error.message);
      alert(error.response?.data || "Failed to complete delivery.");
    }
  };
  
  

  if (!delivery || !pickupCoords || !deliveryCoords) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-[#7fc7e0] via-white to-[#e87c21]/30">
      <h2 className="text-5xl font-extrabold text-center text-[#e87c21] mb-12 drop-shadow">Delivery Details</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <ul className="space-y-3">
              <li><strong>Restaurant:</strong> {delivery.pickupLocation}</li>
              <li><strong>Delivered Items:</strong></li>
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
              <li><strong>Payment Type:</strong> {delivery.paymentType}</li>
              <li><strong>Destination:</strong> {delivery.deliveryLocation}</li>
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
            </ul>
          </div>
        </div>

        <div className="rounded overflow-hidden shadow">
          <MapContainer center={pickupCoords} zoom={13} style={containerStyle}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={pickupCoords}>
              <Popup>Pickup Location</Popup>
            </Marker>
            <Marker position={deliveryCoords}>
              <Popup>Delivery Location</Popup>
            </Marker>
            <Routing pickup={pickupCoords} delivery={deliveryCoords} setEta={setEta} />
          </MapContainer>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default DeliveryDetails;

function Routing({ pickup, delivery, setEta }) {
  const map = useMap();

  useEffect(() => {
    if (!pickup || !delivery) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickup[0], pickup[1]),
        L.latLng(delivery[0], delivery[1])
      ],
      lineOptions: {
        styles: [{ color: '#1E90FF', weight: 5 }]
      },
      createMarker: () => null, // No extra markers
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false,  // Prevent showing instructions
      routerOptions: {
        showAlternatives: false,
      },
      fitSelectedRoutes: true,
    })
    .on('routesfound', function (e) {
      const route = e.routes[0];
      const travelTimeInSeconds = route.summary.totalTime;
      const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60);
      setEta(travelTimeInMinutes);
    })
    .addTo(map);

    // Manually hide the instructions if they appear (extra step)
    const container = document.querySelector('.leaflet-routing-container');
    if (container) {
      container.style.display = 'none';
    }

    return () => map.removeControl(routingControl);
  }, [pickup, delivery, map, setEta]);

  return null;
}
