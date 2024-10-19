const express = require ("express");
const dotenv = require ("dotenv");
const cors = require ("cors");
const connectDB = require("./config/db.js");
const taskRouter = require("./routers/taskRoute.js");
const userRoutes = require("./routers/userRoutes.js");
const projectRoutes = require("./routers/projectRoutes.js");
const { default: helmet } = require("helmet");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://depi-final-project-m1eh.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'self'", "https://vercel.live"],
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  }),
);

app.use(express.json());

app.use("/api/Users", userRoutes);

app.use("/api/Tasks", taskRouter);

app.use("/api/Projects", projectRoutes);

app.get("/health", async (req, res) => {
  try {
    // Attempt to ping the database
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ status: "Database is connected" });
  } catch (error) {
    res.status(500).json({ status: "Database connection failed", error: error.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
