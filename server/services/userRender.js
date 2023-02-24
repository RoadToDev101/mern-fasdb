const axios = require("axios");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;
