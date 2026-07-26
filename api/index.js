const express = require('express');
const axios = require('axios');
const app = express();

// Root path handler (404 hatane ke liye)
app.get('/', (req, res) => {
  res.json({ 
    status: 'active', 
    message: 'Use /api/osint?query=9876543210' 
  });
});

app.get('/api/osint', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Query missing' });

  try {
    const response = await axios.get('https://darkxosint.site/', {
      params: { type: 'numb', key: 'mynkbhai', query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
