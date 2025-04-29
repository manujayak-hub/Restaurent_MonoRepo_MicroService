
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterDriver from "./Pages/Users/RegisterDriver";
import RegisterUser from "./Pages/Users/RegisterUser";
import RegisterRestaurantOwner from "./Pages/Users/RegisterRestaurantOwner";
import LoginUser from "./Pages/Users/LoginUser";
import ResUserDash from "./Pages/Restaurent/ResUserDash";
import OrderPage from "./Pages/Restaurent/OrderPage";

import AllDeliveries from './Pages/Delivery/AllDeliveries';
import CompletedDeliveries from './Pages/Delivery/CompletedDeliveries';
import DeliveryDetails from './Pages/Delivery/DeliveryDetails';
import UserDashboard from './Pages/Delivery/UserDashboard';
import TrackDelivery from './Pages/Delivery/TrackDelivery';
import AdminDeliveries from './Pages/Delivery/AdminDeliveries';



import DriverProfile from './Pages/Delivery/DriverProfile';


import ResOwner from "./Pages/Restaurent/ResOwner";

import TestCartForm from "./Pages/Restaurent/TestCartForm";
import AddToCart from "./Pages/Restaurent/AddToCart";
import RestaurantOrderPage from "./Pages/Restaurent/RestaurantOrderPage";

import ResOrder from "./Pages/Restaurent/ResOrder";

import MyCart from "./Pages/Order/MyCart";
import OrderDetails from "./Pages/Order/OrderDetails";


import Drivercomplete from "./Pages/Delivery/DriverComplete";
import PaymentPage from "./Pages/PaymentPage";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Users/Profile"




function App()
{
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<LoginUser />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register/driver" element={<RegisterDriver />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/owner" element={<RegisterRestaurantOwner />} />
          <Route path="/resuserdash" element={<ResUserDash />} />
          <Route path="/restaurant/:id" element={<OrderPage />} />


        //driver side delivery
          <Route path="/all" element={<AllDeliveries />} />
          <Route path="/delivery-details/:deliveryId" element={<DeliveryDetails />} />
          <Route path="/DriverProfile" element={<DriverProfile />} />
          <Route path="/Drivercomplete" element={<Drivercomplete />} />

        //User side delivery
          <Route path="/completed" element={<CompletedDeliveries />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/track-delivery/:deliveryId" element={<TrackDelivery />} />

        //Admin side delivery
          <Route path="/admin-deliveries" element={<AdminDeliveries />} />


          <Route path="/resowner" element={<ResOwner />} />

          <Route path="/testcartform" element={<TestCartForm />} />
          <Route path="/add-to-cart" element={<AddToCart />} />
          <Route path="/cart" element={<RestaurantOrderPage />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/resorder" element={<ResOrder />} />

          <Route path="/" element={<LoginUser />} />
          <Route path="/register/driver" element={<RegisterDriver />} />
          <Route path="/register/user" element={<RegisterUser />} />
          <Route path="/register/owner" element={<RegisterRestaurantOwner />} />
          <Route path="/resuserdash" element={<ResUserDash />} />
          <Route path="/restaurant/:id" element={<OrderPage />} />





          <Route path="/testcartform" element={<TestCartForm />} />
          <Route path="/add-to-cart" element={<AddToCart />} />
          <Route path="/cart" element={<RestaurantOrderPage />} />

          <Route path="/resowner" element={<ResOwner />} />
          <Route path="/resorder" element={<ResOrder />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />





        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
