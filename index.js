/**
 * Module dependencies
 */

var path = require('path');
var fs = require('fs');
var url = require('url');

/**
 * Static mimetypes
 */

var mimeTypes = {
  '.html' : 'text/html',
  '.md' : 'text/plain',
  '.txt' : 'text/plain',
  '.jpeg' : 'image/jpeg',
  '.jpg' : 'image/jpeg',
  '.png' : 'image/png',
  '.gif' : 'image/gif',
  '.ico' : 'image/x-icon',
  '.js' : 'text/javascript',
  '.css' : 'text/css'
};

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

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return fn();
  }

  var filePath = decodeURIComponent(url.parse(req.url).pathname);
  var mimeType = mimeTypes[path.extname(filePath)];

  if (!path.extname(filePath)) {
    return fn();
  }

  if (~filePath.indexOf('\0')) {
    fn({
      url : filePath,
      status : 400
    });
  }

  filePath = path.normalize(path.join(this.root, filePath));

  if (filePath.indexOf(this.root) !== 0) {
    fn({
      url : filePath,
      status : 404
    });
  }

  fs.exists(filePath, function(exist) {

    if (!exist) {
      fn({
        url : filePath,
        status : 404
      });
      return;
    }

    res.writeHead(200, { 'Content-Type' : mimeType });
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
  if (typeof root !== 'string') {
    return;
  }
  return new Servst(root);
}

/**
 * Module exports
 */

module.exports = Creator;
