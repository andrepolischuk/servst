'use strict';
var test = require('ava');
var http = require('http');
var request = require('supertest');
var servst = require('./');
var statics = servst(__dirname + '/fixture/public');

var app = http.createServer(function (req, res) {
  statics(req, res, function (err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello');
  });
});

test.cb('return 200 for GET /', function (t) {
  request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /text/)
    .expect('Hello')
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 200 for GET /index.js', function (t) {
  request(app)
    .get('/index.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 404 for GET /test.js', function (t) {
  request(app)
    .get('/test.js')
    .expect(404)
    .expect('Content-Type', /text/)
    .expect('Not found')
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 200 for GET relative /public/index.js', function (t) {
  request(app)
    .get('/../public/index.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 404 for GET relative /public/test.js', function (t) {
  request(app)
    .get('/../public/test.js')
    .expect(404)
    .expect('Content-Type', /text/)
    .expect('Not found')
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 404 for GET relative /private/index.js', function (t) {
  request(app)
    .get('/../private/index.js')
    .expect(404)
    .expect('Content-Type', /text/)
    .expect('Not found')
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});

test.cb('return 404 for GET relative /public-isprivate/index.js', function (t) {
  request(app)
    .get('/../public-isprivate/index.js')
    .expect(404)
    .expect('Content-Type', /text/)
    .expect('Not found')
    .end(function (err) {
      t.ifError(err);
      t.end();
    });
});
