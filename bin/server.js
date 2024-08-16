const http = require('http')
const app = require('../src/app')
const port = parseInt(process.env.port,10) || 3000
const server = http.createServer(app)
const debug = require('debug')('nodestr:server')


server.listen(port)
server.on('error', onError);
server.on('listening', onListening);
console.log(`Api executada na porta: ${port}`)

function searchPort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port))
        return val;

    if (port >= 0)
        return port;

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

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
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
