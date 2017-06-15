const config = require('./_config.json');
const Geocoder = require('../lib/geocoder');

const geocoder = new Geocoder(config.apiKey);
geocoder.lookup(['N840653347']).then(res => {
  console.log(res);
});