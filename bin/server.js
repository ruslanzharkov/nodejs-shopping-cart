#!/usr/bin/env node
const app = require('../app');
const debug = require('debug')('shopping-cart:server');
const http = require('http');
const { port } = require('../config/env');

const server = http.createServer(app);

const normalizedPort = normalizePort(port || '3000');
app.set('port', normalizedPort);

/**
 * Creating HTTP server.
 */

server.listen(normalizedPort);
server.on('error', onError);
server.on('listening', onListening);

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

  var bind =
    typeof normalizedPort === 'string'
      ? 'Pipe ' + normalizedPort
      : 'Port ' + normalizedPort;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
  debug('Listening on ' + bind);
}
