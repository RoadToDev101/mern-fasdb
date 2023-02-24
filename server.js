const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./server/database/connection");

const app = express();

// Load env vars
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// Use Morgan to log requests to the console
app.use(morgan("tiny"));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load product routers
app.use("/", require("./server/routes/productRoutes"));

// mongodb connection
connectDB();

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
