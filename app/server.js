'use strict'

module.exports = function(app) {

    const path = require("path");

    let promise = new Promise(function(resolve, reject) {
        if (!app) {
            let express = require('express');
            app = express();
        }

        app.use(function(req, res, next) {
            console.log("Asking for the endpoint: " + req.url);
            next();
        });

        const bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.text());
        app.use(bodyParser.json());
        require('./endpoint/rss2json')(app);

        app.get('/api', function(req, res) {
            res.send('Server Running');
        });

        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname + '/../public/index.html'));
        });
        app.get('/index.html', function(req, res) {
            res.sendFile(path.join(__dirname + '/../public/index.html'));
        });
        app.get('/css/:css', function(req, res) {
            res.sendFile(path.join(__dirname + '/../public/css/' + req.params.css));
        });
        app.get('/js/:js', function(req, res) {
            res.sendFile(path.join(__dirname + '/../public/js/' + req.params.js));
        });


        let server = app.listen(process.env.PORT || 8888, function() {
            //console.log('Server working properly on ' + (process.env.PORT || 8888));
        });

        resolve(server);
    }, function(err) {
        reject(err);
    });
    return promise;
}