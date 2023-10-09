const https = require('https');
const BLIZZARD_API_URL = 'api.blizzard.com';
const API_KEY = process.env.CLIENT_ID;
const API_SECRET = process.env.SECRET_CLIENT_ID;

exports.handler = async (event) => {
  const cardName = event.cardName; // Retrieve card name from the Lambda event

  // Define API request options
  const options = {
    hostname: BLIZZARD_API_URL,
    path: `/hearthstone/cards?name=${encodeURIComponent(cardName)}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${API_KEY}:${API_SECRET}`,
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({
            statusCode: 200,
            body: data,
          });
        } else {
          reject({
            statusCode: res.statusCode,
            body: JSON.stringify({ error: 'An error occurred' }),
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        statusCode: 500,
        body: JSON.stringify({ error: 'An error occurred' }),
      });
    });

    req.end();
  });
};