import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
