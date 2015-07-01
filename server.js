var fs = require('fs');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var SocketIO = require('socket.io');
var SocketIOJWT = require('socketio-jwt');

var creds = require('./credentials.json');

var options = {};
var server = new Hapi.Server(options);

server.connection({
    port: 8000,
    labels: 'secureSocket',
    tls: {
        key: fs.readFileSync('./keys/dev.key'),
        cert: fs.readFileSync('./keys/dev.crt')
    }
});

var io = SocketIO.listen(server.select('secureSocket').listener);

// what does handshake imply? also, socketiojwt middleware from Oauth0

io.use(SocketIOJWT.authorize({
    secret: creds.secret,
    handshake: true
}));

io.sockets.on('connection', function (socket) {
    console.log(socket.decoded_token.name, 'connected');
    socket.emit('msg', {data: 'connected'});
});

server.start();

// Time to Handle Auth.

server.route({
    path: '/login',
    method: 'POST',
    handler: function (req, reply) {
        // TO DO: validate user, e.g. compare hashes
        var profile = {
            first_name: 'John',
            last_name: 'Doe',
            name: 'John Doe',
            email: 'john@doe.com',
            id: 123
        };

        var token = jwt.sign(profile, creds.secret, {expiresInMinutes: 60 * 100});
        reply(token);
    }
});

module.exports = server;
