var io = require('socket.io-client');

var options = {};

var client = io('http://localhost:8000/', options);

client.on('connect', function (socket) {
    console.log('need to learn event emission')
});

