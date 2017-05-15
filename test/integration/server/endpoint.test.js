'use strict'

let express = require('express');
let app = express();
let server;
let request = require('supertest');
let expect = require('expect.js');

describe('RSS integration test endpoint', function() {

    beforeEach(function(done) {
        require('./../../../app/server')(app).then(function(ser) {
            server = ser;
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('With url should return feed jsoned', function(done) {
        this.timeout(10000);
        request(app)
            .post('/api/rss2json')
            .send({ rssEndpoint: 'https://martinfowler.com/feed.atom' })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj).not.to.be.empty();
                done();
            });
    });
});