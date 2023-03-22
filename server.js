const express = require("express");
// Initialize express app
const app = express();
// Async error handling middleware
require("express-async-errors");
const cors = require("cors");

// Set up and use cors
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend domain
  credentials: true, // Access-Control-Allow-Credentials: true
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
const featureRoutes = require("./server/routes/featureRoutes");
const productRoutes = require("./server/routes/productRoutes");
const userRoutes = require("./server/routes/userRoutes");
const fileRoutes = require("./server/routes/fileRoutes");

// Middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authenticateUser = require("./server/middleware/auth");

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
// Use authentication middleware for all routes below
app.use("/api/feature", featureRoutes);
app.use("/api/product", authenticateUser, productRoutes);
app.use("/api/user", authenticateUser, userRoutes);
app.use("/api/file", authenticateUser, fileRoutes);

// Serve the React app's index.html file for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/build", "index.html"));
});

// Use error handling middleware
app.use(require("./server/middleware/notFound"));
app.use(require("./server/middleware/errorHandler"));

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
