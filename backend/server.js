import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRouter from "./routers/taskRoute.js";
import userRoutes from './routers/userRoutes.js';

dotenv.config(); 

const app = express();

app.use(express.json()); 

app.use("/api/Users", userRoutes); 

app.use("/api/Tasks", taskRouter);

app.listen(process.env.PORT || 5000, () => {
  connectDB(); 
  console.log("Server is running on port 5000");
});