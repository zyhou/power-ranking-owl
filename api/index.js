const express = require('express');
const app = express();

app.get('/tweet', (req, res) => {
    res.send('Hello');
});

module.exports = app;
