const express = require('express');
const app = express();

app.get('/tweet', (req, res) => {
    return res.send('/tweet');
});

app.get('/api/tweet', (req, res) => {
    return res.send('/api/tweet');
});

module.exports = app;
