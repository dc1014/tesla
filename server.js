var Hapi = require('hapi');
var SocketIO = require('socket.io');
var fs = require('fs');

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

io.sockets.on('connection', function (socket) {
    socket.emit('msg', {data: 'connected'});
});

// // JWT EXAMPLE SOURCE: https://auth0.com/docs/quickstart/spa/socket-io/no-api
// var socketioJwt = require('socketio-jwt');
// var jwt = require('jsonwebtoken');
// var creds = require('./credentials.json');

// sio.set('authorization', socketioJwt.authorize({
//     secret: creds.secret,
//     handshake: true
// }));

// server.routes({
//     url: 'login',
//     method: 'POST',
//     handler: function (req, res) {
//         //TO DO: validate user
//         var profile = {
//             first_name: 'John',
//             last_name: 'Doe',
//             email: 'john@doe.com',
//             id: 123
//         };

//         var token = jwt.sign(profile, creds.secret, { expiresInMinutes: 60*5});
//         reply({token: token});
//     }
// });

module.exports = server;
