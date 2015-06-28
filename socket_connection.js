var io = require('socket.io-client');

var options = {};

var client = io('http://localhost:8000/', options);

client.on('msg', function (msg) {
    var msg = msg.data;
});
