'use strict'

let express = require('express');
let app = express();
let server;
let request = require('supertest');
let expect = require('expect.js');

describe('Server Test', function() {

    beforeEach(function(done) {
        require('./../../../app/server')(app).then(function(ser) {
            server = ser;
            done();
        }, function(error) {
            console.log(error);
            done();
        });
    });

    afterEach(function(done) {
        server.close(done);
    });

    it('Should return "Server Running message"', function(done) {
        request(app)
            .get('/api')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;

                expect(res.text).equal("Server Running");
                done();
            });
    });
});