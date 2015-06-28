var io = require('socket.io-client');

var options = {};

var client = io('http://localhost:8000/', options);

client.on('connect', function () {
    console.log('need to learn event emission');
    client.emit('accepted', {data: 'acknowledge'});
});

client.on('msg', function (socket) {
    console.log(socket.msg);
    client.emit('response', {data: 'i hear you'});
});
