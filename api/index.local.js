require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.development.local') });

const app = require('./index');

app.listen(3001, function() {
    console.log('Example app listening on port 3001!');
});
