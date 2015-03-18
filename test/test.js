
var servst = require('..');
var http = require('http');
var assert = require('assert');
var request = require('supertest');

var staticServer = servst(__dirname);

var app = http.createServer(function(req, res) {
  staticServer(req, res, function(err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello');
  });
});

describe('GET /', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /text/)
      .expect('Hello')
      .end(function(err, res) {
        assert(err === null);
        done();
      });
  });
});

describe('GET /test.js', function() {
  it('should return 200', function(done) {
    request(app)
      .get('/test.js')
      .expect(200)
      .expect('Content-Type', /javascript/)
      .end(function(err, res) {
        assert(err === null);
        done();
      });
  });
});

describe('GET /index.js', function() {
  it('should return 404', function(done) {
    request(app)
      .get('/index.js')
      .expect(404)
      .expect('Content-Type', /text/)
      .expect('Not found')
      .end(function(err, res) {
        assert(err === null);
        done();
      });
  });
});
