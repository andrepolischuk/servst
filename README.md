# servst [![Build Status][travis-image]][travis-url]

  > Simple file server

  [servst-cli][servst-cli] - CLI for this module

## Install

```sh
npm install --save servst
```

## Usage

```js
var http = require('http');
var servst = require('servst');
var statics = servst(__dirname + '/static');

http.createServer(function(req, res) {
  statics(req, res, function(err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
  });
}).listen(3000);
```

  With express

```js
var express = require('express');
var servst = require('servst');
var app = express();
var statics = servst(__dirname + '/static');

app.use(statics);
app.listen(3000);
```

## License

  MIT

[travis-url]: https://travis-ci.org/andrepolischuk/servst
[travis-image]: https://travis-ci.org/andrepolischuk/servst.svg?branch=master

[servst-cli]: https://github.com/andrepolischuk/servst-cli
