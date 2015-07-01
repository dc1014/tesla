var fs = require('fs');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var SocketIO = require('socket.io');
var SocketioJwt = require('socketio-jwt');

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

// socketiojwt middleware from Oauth0 https://github.com/auth0/socketio-jwt

// ONE ROUND TRIP VS. TWO ROUND TRIP
// Two Round Trip - The client must emit the authenticate event with the token after connectiong.
//      this means one trip to the server and back, then once again with the token

io.sockets.on('connection', SocketioJwt.authorize({
    secret: creds.secret,
    timeout: 15000
})).on('authenticated', function (socket) {
    console.log(socket.decoded_token.name, 'connected');
    socket.emit('msg', {data: "you're in, human or computer."});
});

// One Round Trip - The server listener performs a handshake with the token as a part of the queery.
//      doing so allows intermedidary servers to log the URL

// ORT Method
// io.use(SocketIOJWT.authorize({
//     secret: creds.secret,
//     handshake: true
// }));
// --- token is passed on socket connection

// Time to Handle Auth for ORT Method

// server.route({
//     path: '/login',
//     method: 'POST',
//     handler: function (req, reply) {
//         // TO DO: validate user, e.g. compare hashes

//         var profile = {
//             first_name: 'John',
//             last_name: 'Doe',
//             name: 'John Doe',
//             email: 'john@doe.com',
//             id: 123
//         };

//         var token = jwt.sign(profile, creds.secret, {expiresInMinutes: 60 * 100});
//         reply(token);
//     }
// });

server.start();

module.exports = server;
