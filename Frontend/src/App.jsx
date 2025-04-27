
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterDriver from "./Pages/Users/RegisterDriver";
import RegisterUser from "./Pages/Users/RegisterUser";
import RegisterRestaurantOwner from "./Pages/Users/RegisterRestaurantOwner";
import LoginUser from "./Pages/Users/LoginUser";
import ResUserDash from "./Pages/Restaurent/ResUserDash";
import OrderPage from "./Pages/Restaurent/OrderPage";

import AllDeliveries from './Pages/Delivery/AllDeliveries';
import CompletedDeliveries from './Pages/Delivery/CompletedDeliveries';
import CreateDelivery from './Pages/Delivery/CreateDelivery';
import Dashboard from './Pages/Delivery/Dashboard';
import DeliveryDetails from './Pages/Delivery/DeliveryDetails';
import UserDashboard from './Pages/Delivery/UserDashboard';
import TrackDelivery from './Pages/Delivery/TrackDelivery';
import AdminDeliveries from './Pages/Delivery/AdminDeliveries';
import DriverDeliveries from './Pages/Delivery/DriverDeliveries';
import CreateOrderAndDelivery from './Pages/Delivery/CreateOrderAndDelivery';

import ResOwner from "./Pages/Restaurent/ResOwner";
import ResOrder from "./Pages/Restaurent/ResOrder";





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginUser/>} /> 
        <Route path="/register/driver" element={<RegisterDriver/>} />
        <Route path="/register/user" element={<RegisterUser/>} />
        <Route path="/register/owner" element={<RegisterRestaurantOwner/>} />
        <Route path="/resuserdash" element={<ResUserDash/>} />
        <Route path="/restaurant/:id" element={<OrderPage />} />

        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all" element={<AllDeliveries />} />
        <Route path="/completed" element={<CompletedDeliveries />} />
        <Route path="/create" element={<CreateDelivery />} />
        <Route path="/delivery-details/:deliveryId" element={<DeliveryDetails />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/track-delivery/:deliveryId" element={<TrackDelivery />} />
        <Route path="/admin-deliveries" element={<AdminDeliveries />} />
        <Route path="/DriverDeliveries" element={<DriverDeliveries />} />
        <Route path="/CreateOrderAndDelivery" element={<CreateOrderAndDelivery />} />

        <Route path="/resowner" element={<ResOwner />} />
        <Route path="/resorder" element={<ResOrder />} />


        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
