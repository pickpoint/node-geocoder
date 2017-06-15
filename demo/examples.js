const config = require('./config.json');
const Geocoder = require('../lib/geocoder');

const geocoder = new Geocoder(config.apiKey);

geocoder.forward('New York').then(res => {
  console.log(res[0]);
});

geocoder.reverse('48.8698899', '2.3084521').then(res => {
  console.log(res);
});

geocoder.lookup(['N840653347']).then(res => {
  console.log(res);
});