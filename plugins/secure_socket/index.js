// var Handler = require('./handler');
var SocketioJwt = require('socketio-jwt');
var SocketIO = require('socket.io');
var creds = require('../../credentials.json');

exports.register = function (server, options, next) {
    var io = SocketIO.listen(server.select('secureSocket').listener);

    io.on('connection', SocketioJwt.authorize({
        secret: creds.secret,
        timeout: 15000
    })).on('authenticated', function (socket) {
        console.log(socket.decoded_token.name + ' connected');
        socket.emit('msg', {data: "you're in, human or computer."});
    });

    // io.on('authenticated', Handler.authenticated);

    // One Round Trip - The server listener performs a handshake with the token as a part of the queery.
    //      doing so allows intermedidary servers to log the URL

    // io.use(SocketIOJWT.authorize({
    //     secret: creds.secret,
    //     handshake: true
    // }));
    // --- token is passed in querystring on socket connection

    next();
}

exports.register.attributes = {
    name: 'hapi-secure-socket'
};
