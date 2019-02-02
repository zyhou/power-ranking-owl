const express = require('express');
const twit = require('twit');

const app = express();

const twitter = new twit({
    consumer_key: '...',
    consumer_secret: '...',
    access_token: '...',
    access_token_secret: '...',
    timeout_ms: 60 * 1000,
});

app.get('/api/tweet', (req, res) => {
    return res.send('/api/tweet');
});

module.exports = app;
