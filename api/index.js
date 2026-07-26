module.exports = async (req, res) => {
  const { type, key, query } = req.query;

  // Frontend API key check
  if (key !== "fixerror") {
    return res.status(401).json({
      success: false,
      error: "Invalid API key"
    });
  }

  if (!type || !query) {
    return res.status(400).json({
      success: false,
      error: "Missing type or query"
    });
  }

  try {
    const response = await fetch(
      `https://darkxosint.site/?type=${encodeURIComponent(type)}&key=mynkbhai&query=${encodeURIComponent(query)}`
    );

    const data = await response.text();

    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/json"
    );

    return res.status(response.status).send(data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
