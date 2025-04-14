import express from "express";
import { register, login, refreshToken, logout, adminOnlyRoute,getUserDetails ,deleteUser } from "../Controller/Auth_Controller.js";
import { authenticateToken } from "../Middleware/Authentication.js"
import { authorizeAdmin } from "../Middleware/AuthorizeAdmin.js";
const Authrouter = express.Router();

Authrouter.post("/register",  register); 
Authrouter.post("/login", login);
Authrouter.post("/refresh", refreshToken);
Authrouter.post("/logout", logout);
Authrouter.get("/getuserdetails",authenticateToken,getUserDetails);
Authrouter.delete("/deluser",authenticateToken,deleteUser);

Authrouter.get("/admin", authenticateToken, authorizeAdmin, adminOnlyRoute); 

export default Authrouter;
