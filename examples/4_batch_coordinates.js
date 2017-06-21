require('colors');

const config = require('./_config.json');
const Geocoder = require('../');

const geocoder = new Geocoder(config.apiKey);
const coordinates = require('./data/coordinates.json').coordinates;

const promises = coordinates
  .map(c => geocoder.reverse(c[0], c[1], {zoom: 6}));

const startTime = new Date();
Promise.all(promises).then(results => {
  const elapsed = new Date() - startTime;
  results.forEach(r => console.log(r.display_name));
  console.log(`Done. Results count: ${results.length}. Execution time: ${elapsed}ms.`.green);
});
