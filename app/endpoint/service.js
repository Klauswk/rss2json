'use strict';

const parser = require('noderssparser');
const http = require("http");
const https = require("https");

function toJson(req, res) {
    if (!req.body.rssEndpoint) {
        res.status(400).json({ error: "Must have an rss/atom endpoint" });
    } else {
        getUrlResponse(req.body.rssEndpoint).then((resolve) => {
            res.status(200).json(resolve);
        }).catch((reject) => {
            res.status(200).json(reject);
        });
    }
}

function getUrlResponse(rssEndpoint) {
    let promise = new Promise((resolve, reject) => {
        let body = '';
        if (rssEndpoint.indexOf("https") > -1) {
            https.get(rssEndpoint, (res) => {
                res.on('data', onData);
                res.on('end', onEnd);
            }).on('error', onError);
        } else {
            http.get(rssEndpoint, (res) => {
                res.on('data', onData);
                res.on('end', onEnd);
            }).on('error', onError);
        }

        function onData(d) {
            body += d;
        }

        function onError(error) {
            reject(error);
        }

        function onEnd() {
            let result = parser(body);
            resolve(result);
        }
    });

    return promise;
}


module.exports = {
    toJson: toJson,
}