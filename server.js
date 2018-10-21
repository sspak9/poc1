const express = require('express');
const path = require('path');
const helmet = require('helmet')();
const compression = require('compression')();
var http = require('http');

const app = express();

app.use(helmet);
app.use(compression);

// the vue file will be under dist
const pub = path.join(__dirname, 'dist');
const index = path.join(pub, 'index.html');

app.use('/',  express.static(pub));

// this express app's only responsibility now is to serve the content of the /dist folder
app.get('/' , (req, res) => res.sendFile(index));

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      //console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      //console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }


}
