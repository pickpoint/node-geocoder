const config = require('./_config.json');
const Geocoder = require('../');

const geocoder = new Geocoder(config.apiKey);
geocoder.reverse('48.8698899', '2.3084521').then(res => {
  console.log(res);
});