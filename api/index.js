const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/tweet', (req, res) => res.send('Hello Twitter!'));

app.listen(process.env.PORT || 3000);
