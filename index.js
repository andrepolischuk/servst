/**
 * Module dependencies
 */

var path = require('path');
var fs = require('fs');

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
 * Module
 * @param  {String} route
 * @return {Function}
 * @api private
 */

function Servst(route) {

  return function(req, res, fn) {

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return fn();
    }

    var mimeType = mimeTypes[path.extname(req.url)];

    if (!mimeType) {
      return fn();
    }

    var filename = path.join(process.cwd(), route, req.url);

    fs.exists(filename, function(exist) {

      if (exist) {
        res.writeHead(200, { 'Content-Type' : mimeType });
        fs.createReadStream(filename).pipe(res);
      } else {
        fn({ status : 404 });
      }

    });

  };

}

/**
 * Module creator
 * @param  {String} route
 * @return {Object}
 * @api public
 */

function Creator(route) {

  if (typeof route !== 'string') {
    return;
  }

  return new Servst(route);

}

/**
 * Module exports
 */

module.exports = Creator;
