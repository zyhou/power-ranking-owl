const twit = require('twit');
const config = require('../src/config');

const twitter = new twit({
    consumer_key: config.CONSUMER_KEY,
    consumer_secret: config.CONSUMER_SECRET,
    access_token: config.ACCESS_TOKEN,
    access_token_secret: config.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

const uploadImage = (b64Image, callback) => {
    twitter.post('media/upload', { media_data: b64Image }, (errorUpload, { media_id_string: mediaIdStr }) => {
        if (errorUpload) {
            return callback({ error: errorUpload });
        }

        twitter.post('media/metadata/create', { media_id: mediaIdStr }, errorCreateMedia => {
            if (errorCreateMedia) {
                return callback({ error: errorCreateMedia });
            }

            const params = { status: 'Power ranking Copy', media_ids: [mediaIdStr] };

            twitter.post('statuses/update', params, (errorStatus, image) => {
                if (errorStatus) {
                    return callback({ error: errorStatus });
                }
                return callback({ url: image.extended_entities.media[0].display_url });
            });
        });
    });
};

module.exports = { uploadImage };
