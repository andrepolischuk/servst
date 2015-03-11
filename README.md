# Servst

  Simple file server with CLI support

## Instalation

```sh
$ npm install -g servst
```

## Use

```sh
Usage: servst [options] [dir]

Options:

  -h, --help         output usage information
  -V, --version      output the version number
  -p, --port <port>  specify port
```

## Example

```js
var http = require('http');
var servst = require('servst');
var staticServer = servst(__dirname + '/static');

http.createServer(function(req, res) {
  staticServer(req, res, function(err) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
    }
  });
}).listen(3000);
```

## API

### servst(path)

  Create example for defined `path`:

```js
var staticServer = servst(__dirname + '/static');
```

### staticServer(req, res, next)

  Start listener

## License

  MIT
