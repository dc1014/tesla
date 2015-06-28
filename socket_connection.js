var io = require('socket.io-client');

var options = {};

var client = io.Manager('http://localhost:8000/', options);


