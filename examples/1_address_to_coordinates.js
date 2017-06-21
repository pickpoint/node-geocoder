const config = require('./_config.json');
const Geocoder = require('../');

const geocoder = new Geocoder(config.apiKey);
geocoder.forward('New York').then(res => {
  console.log(res[0]);
});