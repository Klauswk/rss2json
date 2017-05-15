'use strict'

let service = require('./service');

module.exports = function(app) {
    app.route('/api/rss2json').post(service.toJson);
}