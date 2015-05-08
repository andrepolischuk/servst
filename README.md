# servst

  Simple file server with CLI support

## Instalation

```sh
$ npm install servst
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

## API

### servst(path)

  Create example for defined `path`:

```js
var statics = servst(__dirname + '/static');
```

### statics(req, res, next)

  Start listener

## CLI

```sh
Usage: servst [options] [dir]

Options:

  -h, --help         output usage information
  -V, --version      output the version number
  -p, --port <port>  specify port
```

## License

  MIT
