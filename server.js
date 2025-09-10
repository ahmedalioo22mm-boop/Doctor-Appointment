/** @format */
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/docters.js";
import Appointment from "./routes/appointment.js";
import Departments from "./routes/Departments.js";
import cors from "cors";

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors()); // <-- يجب أن يكون هنا
app.use(express.json());
app.use("/uploads", express.static("./uploads"));

// Mount routes
app.use("/user", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", Appointment);
app.use("/departments", Departments);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`);
});
