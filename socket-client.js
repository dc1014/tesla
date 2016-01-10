var io = require('socket.io-client');
var socket = io.connect('https://localhost:8000');
var token = 123

socket.on('connect', function (socket) {
    this.on('authenticated', function () {
            console.log('client authenticated');
    });
    this.emit('authenticate', {token: token})
    this.on('msg', function (msg) {
            console.log(msg.data);
            this.disconnect();
        });
    this.on('disconnect', function () {
            console.log('i disconnected');
        });
});

// //    ORT Method

// var request = require('request');
// request.post({
//     uri: 'https://localhost:8000/login',
//     method: 'POST',
//     rejectUnauthorized: false
// }, function (err, res, body) {

// //    var client = io('https://localhost:8000', {'query': 'token=' + body});
    // client.on('connect', function (socket) {
    //     socket.on('authenticated', function () {
    //         console.log('i am authenticated!');
    //     });
    //     socket.emit('authenticate', {token: body});
    // });
// });

// Error Handling

//     client.on('error', function (err) {
//         if (err.type == "UnauthorizedError" || err.code == "invalid_token") {
//             // redirect user to login page perhaps?

//             console.log("User's token has expired");
//         }
//     });
// });
