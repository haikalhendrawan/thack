import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();

// ----------------------MIDDLEWARE---------------------
app.use(cors({
    origin:'http://localhost:3030',
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use(authRoute);
app.use(userRoute);

// -------------------------------Db----------------------------------------

//-------------------------------  ENDPOINT ---------------------------------

app.listen('3031', ()=>{
    console.log("app running on port 3031")
})