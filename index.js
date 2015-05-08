
'use strict';

/**
 * Module dependencies
 */

var path = require('path');
var fs = require('fs');
var url = require('url');
var mime = require('mime');

/**
 * Serve object
 * @param  {String} root
 * @return {Function}
 * @api private
 */

function Servst(root) {
  this.root = path.normalize(root);
  return this.serve.bind(this);
}

/**
 * Serve file
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} fn
 * @return {Mixed}
 * @api private
 */

Servst.prototype.serve = function(req, res, fn) {
  if (!/^(GET|HEAD)$/.test(req.method)) return fn();

  var filePath = decodeURIComponent(url.parse(req.url).pathname);

  if (!path.extname(filePath)) return fn();

  if (~filePath.indexOf('\0')) {
    fn({
      url: filePath,
      status: 400
    });
  }

  filePath = path.normalize(path.join(this.root, filePath));

  if (filePath.indexOf(this.root) !== 0) {
    fn({
      url: filePath,
      status: 404
    });
  }

  fs.exists(filePath, function(exist) {
    if (!exist) {
      fn({
        url: filePath,
        status: 404
      });
      return;
    }

    var mimeType = mime.lookup(filePath);
    res.writeHead(200, {'Content-Type': mimeType + '; charset=utf-8'});
    fs.createReadStream(filePath).pipe(res);
  });
};

/**
 * Module creator
 * @param  {String} root
 * @return {Object}
 * @api public
 */

function Creator(root) {
  if (typeof root !== 'string') return;
  return new Servst(root);
}

/**
 * Module exports
 */

module.exports = Creator;
