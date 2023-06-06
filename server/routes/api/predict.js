const express = require("express");
const router = express.Router();
const { PythonShell } = require("python-shell");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../../errors/bad-request");

router.post("/test", async (req, res) => {
  const { name } = req.body;

  const options = {
    mode: "json", // Set the mode to 'json' to receive a parsed JSON response
    pythonOptions: ["-u"],
    scriptPath: "server/src/ml_model/",
    args: [name],
  };

  const results = await PythonShell.run("test.py", options);

  if (!results || results.length === 0) {
    throw new BadRequestError("Test failed");
  }

  // Assuming the script only outputs a single JSON object
  const jsonResult = JSON.parse(results[0]);

  res.status(StatusCodes.OK).json(jsonResult);
});

module.exports = router;
