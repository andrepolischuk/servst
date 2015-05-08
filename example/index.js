
/**
 * Module dependencies
 */

var http = require('http');
var servst = require('..');

/**
 * Create example
 */

var statics = servst(__dirname + '/static');

/**
 * Module exports
 */

http.createServer(function(req, res) {
  statics(req, res, function(err) {
    if (err) {
      res.writeHead(404, { 'Content-Type' : 'text/plain' });
      res.end('Not found');
    }

    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('Hello!');
  });
}).listen(3000);
