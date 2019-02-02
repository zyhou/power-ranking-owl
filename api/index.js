const express = require('express');
const config = require('../src/config');
const twitter = require('./twitter');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json({ limit: '500kb' }));

app.post(config.ROUTE_URL, (req, res) => {
    if (!req.body.image) {
        return res.send({ error: 'wrong param' });
    }

    twitter.uploadImage(req.body.image, result => {
        return res.send({ result });
    });
});

module.exports = app;
