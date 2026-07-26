const express = require("express");
const axios = require("axios");

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "active",
    message: "Use /api/osint?query=9876543210"
  });
});

app.get("/api/osint", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Query parameter is required"
    });
  }

  try {
    const response = await axios.get("https://darkxosint.site/", {
      params: {
        type: "numb",
        key: "mynkbhai",
        query: query
      },
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      },
      timeout: 15000
    });

    return res.status(200).json(response.data);

  } catch (err) {
    return res.status(err.response?.status || 500).json({
      success: false,
      error: err.message,
      data: err.response?.data || null
    });
  }
});

module.exports = app;
