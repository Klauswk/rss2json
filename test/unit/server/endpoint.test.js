'use strict'

let express = require('express');
let app = express();
let server;
let request = require('supertest');
let expect = require('expect.js');

describe('RSS endpoint', function() {

    beforeEach(function(done) {
        require('./../../../app/server')(app).then(function(ser) {
            server = ser;
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('Incorrect url shouldn\'t throw error ', function(done) {
        this.timeout(10000);
        request(app)
            .post('/api/rss2json')
            .send({ rssEndpoint: 'https://asd.com.asds' })
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj).not.to.be.empty();
                done();
            });
    });

    it('Request error if not atom/rss specified', function(done) {
        request(app)
            .post('/api/rss2json')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(400)
            .end(function(err, res) {
                if (err) throw err;

                let responseObj = JSON.parse(res.text);
                expect(responseObj.error).equal("Must have an rss/atom endpoint");
                done();
            });
    });
});