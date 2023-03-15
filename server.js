const express = require("express");
const cors = require("cors");
// Async error handling middleware
require("express-async-errors");

// Initialize express app
const app = express();

// Set up and use cors
const corsOptions = {
  origin: "http://localhost:5000", // Replace with your frontend domain
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Load env vars
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });
const PORT = process.env.PORT || 8080;

// Database connection
const connectDB = require("./server/database/connection");

// Routes
const authRoutes = require("./server/routes/authRoutes");
// const userRoutes = require("./server/routes/userRoutes");
// const productRoutes = require("./server/routes/productRoutes");

// Middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const notFoundMiddleware = require("./server/middleware/notFound");
const errorHandlerMiddleware = require("./server/middleware/errorHandler");

// Use Morgan to log requests to the console
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "./public/build")));

// Load auth, user, product routers
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

// Serve the React app's index.html file for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/build", "index.html"));
});

// Use error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start server only after mongodb connection is established
const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
