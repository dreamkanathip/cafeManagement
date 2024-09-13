const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./routes/auth");

// Configure CORS
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"], // Frontend address
  })
);

// Use cookie-parser and body-parser
app.use(cookieParser());
app.use(express.json());

// Use routes for authentication
app.use("/api", authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect("mongodb://localhost:27017/cafeManagement")
  .then(() => {
    console.log("Connected to MongoDB database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB database:", error);
  });
