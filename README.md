# Servst

  Module for serve static files

## Instalation

  ...

## Usage

```js
var http = require('http');
var servst = require('servst');
var static = servst('/static');

http.createServer(function(req, res) {
  static(req, res, function(err) {
    if (err) {
      res.writeHead(404, { 'Content-Type' : 'text/plain' });
      res.end('Not found');
    }
  });
}).listen(3000);
```
