var Hapi = require('hapi');
var SocketIO = require('socket.io');

var options = {};

var server = new Hapi.Server(options);

server.connection({port: 8000});

server.route({
    path: '/',
    method: 'GET',
    handler: function (request, reply) {
        reply('foo');
    }
});

var io = SocketIO.listen(server.listener);

io.sockets.on('connection', function (socket) {
    socket.emit('msg', {data: 'connected'})
});

if (!module.parent) server.start();

module.exports = server;
