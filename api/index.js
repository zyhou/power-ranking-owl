const express = require('express');
const app = express();

app.get('/api/tweet', (req, res) => {
    return res.send('/api/tweet');
});

module.exports = app;
