/**
 * Module dependencies
 */

var http = require('http');
var servst = require('servst');

/**
 * Create example
 */

var serveStatic = servst(__dirname + '/static');

/**
 * Module exports
 */

http.createServer(function(req, res) {

  serveStatic(req, res, function(err) {

    if (err) {
      res.writeHead(404, { 'Content-Type' : 'text/plain' });
      res.end('Not found');
    }

    res.writeHead(200, { 'Content-Type' : 'text/plain' });
    res.end('Hello!');

  });

}).listen(3000);
