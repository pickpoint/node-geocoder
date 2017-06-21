const request = require('superagent');
const Promise = require('bluebird');
const _ = require('lodash');

class Geocoder {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Reverse geocoding
   * @param options:
   *   latitude <numeric> required
   *   longitude <numeric> required
   * @returns Promise
   */
  reverse(latitude, longitude, options = {}) {
    const params = {
      key: this.apiKey,
      lat: latitude,
      lon: longitude,
      zoom: 18
    };
    return this._request('reverse', _.merge(params, options));
  }

  /**
   * Forward geocoding
   * @param query <string> required
   * @returns Promise
   */
  forward(query, options = {}) {
    const params = {
      key: this.apiKey,
      q: query,
    };
    return this._request('forward', _.merge(params, options));
  }

  /**
   * OSM object lookup
   * @param Array<numeric> required
   * @returns Promise
   */
  lookup(osmIds) {
    const params = {
      key: this.apiKey,
      osm_ids: osmIds.join(','),
    };
    return this._request('lookup', params);
  }

  _request(action, query) {
    return new Promise((resolve, reject) => {
      request
        .get(`https://api.pickpoint.io/v1/${action}`)
        .query(query)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(err) {
            reject(err);
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
}

module.exports = Geocoder;