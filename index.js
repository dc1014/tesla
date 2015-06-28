var Hapi = require('hapi');
var SocketIO = require('socket.io');

var options = {};

var server = new Hapi.Server(options);

server.connection({port: 8000});

var io = SocketIO.listen(server.listener);

io.sockets.on('connection', function (socket) {
    socket.emit('msg', {data: 'connected'})
});

module.exports = server;
