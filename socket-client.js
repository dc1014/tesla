var io = require('socket.io-client');
var request = require('request');

request.post({
    uri: 'https://localhost:8000/login',
    method: 'POST',
    rejectUnauthorized: false
}, function (err, res, body) {
    var client = io('https://localhost:8000', {'query': 'token=' + body});

    client.on('msg', function (msg) {
        console.log(msg.data);
        client.disconnect();
    });

    client.on('disconnect', function () {
        console.log('i disconnected');
    })

    client.on('error', function (err) {
        if (err.type == "UnauthorizedError" || err.code == "invalid_token") {
            // redirect user to login page perhaps?

            console.log("User's token has expired");
        }
    });
});


