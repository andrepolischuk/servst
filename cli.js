#!/usr/bin/env node

/**
 * Module dependencies
 */

var servst = require('./');
var http = require('http');
var resolve = require('path').resolve;
var program = require('commander');

/**
 * Program
 */

program
  .version(require('../package').version)
  .usage('[options] [dir]')
  .option('-p, --port <port>', 'specify port', Number, 3000)
  .parse(process.argv);

/**
 * Whitespaces
 */

console.log();

process.on('exit', function(){
  console.log();
});

/**
 * Path
 */

var path = resolve(program.args.shift() || '.');

/**
 * Create static
 */

var statics = servst(path);

/**
 * Create server
 */

var server = http.createServer(function(req, res) {
  statics(req, res, function(err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      console.error('    \033[91m404 \033[0m%s\033[90m not found\033[0m', err.url);
    }
  });
});

/**
 * Start listening
 */

server.listen(program.port, function() {
  console.log('    \033[96mServing \033[0m%s\033[90m on port \033[0m%d', path, program.port);
  console.log();
});