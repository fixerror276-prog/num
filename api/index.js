module.exports = async (req, res) => {
  const { type, key, query } = req.query;

  // Frontend API Key
  if (key !== "fixerror") {
    return res.status(401).json({
      success: false,
      error: "Invalid API key"
    });
  }

  if (!query) {
    return res.status(400).json({
      success: false,
      error: "Query parameter missing"
    });
  }

  // Sirf expected type allow karo
  if (type !== "numb") {
    return res.status(400).json({
      success: false,
      error: "Invalid type"
    });
  }

  try {
    const response = await fetch(
      `https://darkxosint.site/?type=numb&key=mynkbhai&query=${encodeURIComponent(query)}`
    );

    const contentType = response.headers.get("content-type") || "application/json";
    const body = await response.text();

    res.setHeader("Content-Type", contentType);
    return res.status(response.status).send(body);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
