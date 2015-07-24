'use strict';
var path = require('path');
var fs = require('fs');
var url = require('url');
var mime = require('mime');

module.exports = function(root) {
  if (typeof root !== 'string') return;
  root = path.normalize(root);

  return function(req, res, fn) {
    if (!/^(GET|HEAD)$/.test(req.method)) return fn();
    var filePath = decodeURIComponent(url.parse(req.url).pathname);
    if (!path.extname(filePath)) return fn();

    if (~filePath.indexOf('\0')) {
      fn({
        url: filePath,
        status: 400
      });
    }

    filePath = path.normalize(path.join(root, filePath));

    if (filePath.indexOf(root) !== 0) {
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
  }
};
