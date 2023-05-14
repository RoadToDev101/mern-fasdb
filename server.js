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
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8080;

// Database connection
const connectDB = require("./server/database/connection");

// Middleware
const morgan = require("morgan");
const bodyParser = require("body-parser");
const authenticateUser = require("./server/middleware/authentication");
const authorization = require("./server/middleware/authorization");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

// Use Morgan to log requests to the console
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/auth", require("./server/routes/authRoutes"));
// Use authentication and authorization middleware for below routes
app.use(
  "/api/product",
  authenticateUser,
  authorization,
  require("./server/routes/productRoutes")
);
app.use(
  "/api/user",
  authenticateUser,
  authorization,
  require("./server/routes/userRoutes")
);
app.use(
  "/api/file",
  authenticateUser,
  authorization,
  require("./server/routes/fileRoutes")
);

// Serve the React app's index.html file for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
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
