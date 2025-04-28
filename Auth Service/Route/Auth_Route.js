import express from "express";
import { register, login, refreshToken, logout, adminOnlyRoute,getUserDetails ,deleteUser,getUserDetailsById} from "../Controller/Auth_Controller.js";
import { authenticateToken } from "../Middleware/Authentication.js"
import { authorizeAdmin } from "../Middleware/AuthorizeAdmin.js";
const Authrouter = express.Router();

Authrouter.post("/register",  register); 
Authrouter.post("/login", login);
Authrouter.post("/refresh", refreshToken);
Authrouter.post("/logout", logout);
Authrouter.get("/getuserdetails",authenticateToken,getUserDetails);
Authrouter.delete("/deluser",authenticateToken,deleteUser);
// New route for fetching user details by UID without token
Authrouter.get("/userdetails/:uid", getUserDetailsById); 

Authrouter.get("/admin", authenticateToken, authorizeAdmin, adminOnlyRoute); 

export default Authrouter;
