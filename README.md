# PickPoint Geocoder for NodeJS
Node library for converting geographical coordinates to addresses and vice versa using [OpenStreetMap](https://www.openstreetmap.org/about) data.

## Requirements
Before using the library you need to obtain API key at [https://pickpoint.io](https://pickpoint.io).
PickPoint is geocoding service. For non-commercial usage it provides Free plan with 2500 requests/day. 
For details please read the [Terms of Service](https://pickpoint.io/terms-of-service).

## Installation
npm install pickpoint-geocoder

## Usage

### Import the library and initialize geocoder instance.
```javascript
const Geocoder = require('pickpoint-geocoder');
//...
// Here you need to replace 'YOUR-API-KEY' 
// with a key obtained at https://pickpoint.io.
const geocoder = new Geocoder('YOUR-API-KEY');
```

### Forward Geocoding
Forward geocoding is a translation of geographical names (addresses) to coordinates, i.e.:
 "New York Liberty Island" ---> "40.68981905, -74.0451396392316".

```javascript
//...
geocoder.forward('New York Liberty Island').then(res => {
  console.log(res[0]);
});
```

### Reverse Geocoding
Reverse geocoding is a translation of coordinates to geographical names (addresses), i.e.:
latitude: 48.8588100, longitude: 2.32003101155031 ---> "Académie de Paris, Rue Casimir Périer, Invalides, 7e, Paris, Île-de-France, France métropolitaine, 75007, France" 

```javascript
//...
geocoder.reverse('48.8588100', '2.32003101155031').then(res => {
  console.log(res);
});
```

### Lookup OSM Object
In case when you just need to refresh information of an object which has been already forward- or reverse- geocoded, 
you can just reload the data using Lookup function. It's a bit faster operation than address/coordinates transformation.


Today:
```javascript
//...
geocoder.reverse('48.8588100', '2.32003101155031').then(res => {
  console.log(res);
});
```
---> osm_type: "relation", osm_id: "5962792", "some data" 

20 days later:
```javascript
//...
geocoder.lookup(['R5962792']).then(res => {
  console.log(res);
});
```
--> "some updated data"

### Batch Processing
As the Geocoder uses promises you're easily able to make asynchronous requests to the servers.
 
```javascript
//...
const coordinates = [
   ["51.14075236","14.51772506"],
   ["51.57192303","13.81030787"],
   ["51.5048526","14.85497735"]
];

const promises = coordinates
  .map(c => geocoder.reverse(c[0], c[1], {zoom: 6}));

// For better results please restrict your "parallelism" up to 50-100 simultaneous calls. 
Promise.all(promises).then(results => {
  results.forEach(r => console.log(r.display_name));
});
```

## Examples
You can find a couple of examples of how to use the library 
in [/examples](https://github.com/pickpoint/node-geocoder/tree/master/examples) directory.
The examples are configured to use relative path to the library.
There is a testing API key. 
Please replace it with your own, because the existing one most probably will be locked by others.   

## Contributing
Basically the package is pretty simple and we're not expecting further improvements.
But it would be great if you could extend the list of examples by snippets from your experience!

1. Fork it (https://github.com/pickpoint/node-geocoder/fork).
2. Create your feature branch (git checkout -b my-new-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin my-new-feature).
5. Create a new Pull Request.

## License
[MIT](https://github.com/pickpoint/node-geocoder/blob/master/LICENSE)