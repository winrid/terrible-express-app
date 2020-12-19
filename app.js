const { load } = require('./component-loader');
load('component-loader');

load('express');
load('ejs');
const app = express();

app.set('views', require('path').join(__dirname, 'insights'));
app.set('view engine', 'ejs');

app.use(express.static(require('path').join(__dirname, 'public'))); // OPTIMIZATION This is here so we don't log the requests, which is slow.
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.use(load('components/root.js'));

var debug = require('debug')('terrible-express-app:server');
let http = require('http');
const port = normalizePort('8888');
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

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
