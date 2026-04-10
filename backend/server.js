import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// -------------------- MIDDLEWARE --------------------
// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", // Local Vite
  "https://bakemart-paradise.vercel.app", // Production Frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(express.json());

// -------------------- ROUTES --------------------
app.use("/api", orderRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("Bakemart API is running...");
});

// -------------------- SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
