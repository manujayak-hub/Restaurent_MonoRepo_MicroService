import cors from "cors"
import "dotenv/config"
import express, { response } from "express"
import { Logger }  from "./Utilities/Logger.js"
import MongoConnect from "./Configuration/DB_Connection.js"
import Authrouter from "./Route/Auth_Route.js"



const app = express()
const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173', 
optionsSuccessStatus: 200} ))

//middleware
app.use(express.json())

app.use((req,res,next) => {
console.log(req.path,req.method)
next()
})  
 

//routes
app.use("/auth",Authrouter);

app.listen(PORT , ()=>{
    Logger.info("Connected via Port " + PORT)
    MongoConnect()
})


export default app; 