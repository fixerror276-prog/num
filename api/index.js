const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "running",
    message: "API is working"
  });
});

app.get("/api/osint", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        error: "Query parameter missing"
      });
    }

    const response = await axios.get(
      `https://darkxosint.site/?type=numb&key=mynkbhai&query=${encodeURIComponent(query)}`,
      {
        timeout: 15000,
        validateStatus: () => true
      }
    );

    return res.status(response.status).json({
      success: true,
      backend_status: response.status,
      backend_data: response.data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      code: err.code,
      stack: err.stack
    });
  }
});

module.exports = app;
