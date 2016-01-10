var fs = require('fs');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');

var creds = require('./credentials.json');

var options = {};

var server = new Hapi.Server(options);

server.connection({
    port: 8000,
    labels: ['secureSocket'],
    tls: {
        key: fs.readFileSync('./keys/dev.key'),
        cert: fs.readFileSync('./keys/dev.crt')
    }
});

server.register(require('./plugins'), function (err) {
    if (err) throw err;
});

// Required for ORT Method

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
