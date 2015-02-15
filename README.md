# Servst

  Module for serve static files

## Instalation

```sh
$ npm install servst
```

## Use

```js
var http = require('http');
var servst = require('servst');
var serveStatic = servst(__dirname + '/static');

http.createServer(function(req, res) {
  serveStatic(req, res, function(err) {
    if (err) {
      res.writeHead(404, { 'Content-Type' : 'text/plain' });
      res.end('Not found');
    }
  });
}).listen(3000);
```

## API

### servst(root)

  Create example for defined `root`:

```js
var servstExample = servst(__dirname + '/static');
```

### servstExample(req, res, next)

  Start listener

## License

  MIT
