
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterDriver from "./Pages/Users/RegisterDriver";
import RegisterUser from "./Pages/Users/RegisterUser";
import RegisterRestaurantOwner from "./Pages/Users/RegisterRestaurantOwner";
import LoginUser from "./Pages/Users/LoginUser";
import ResUserDash from "./Pages/Restaurent/ResUserDash";
import OrderPage from "./Pages/Restaurent/OrderPage";
import ResOwner from "./Pages/Restaurent/ResOwner";




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
        <Route path="/resowner" element={<ResOwner />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
