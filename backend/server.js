import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
<<<<<<< HEAD
import userRoutes from './router/userRoutes.js';

dotenv.config(); 

const app = express();

app.use(express.json()); 

app.use('/api/users', userRoutes); 
=======
import taskRouter from "./router/taskRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/Tasks", taskRouter);
>>>>>>> 0e7224f6bce63e91b9d4b5b4e421462885fec5de

app.listen(process.env.PORT || 5000, () => {
  connectDB(); 
  console.log("Server is running on port 5000");
});