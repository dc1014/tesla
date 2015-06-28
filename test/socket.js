var io = require('socket.io-client');
var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();
var server = require('./../');

var expect = Code.expect;
var test = lab.test;

lab.experiment('socket connection', function () {
    lab.beforeEach(function (done) {
        server.start();
        done();
    });

    lab.test('should emit msg event', function (done) {
        var client = io('http://localhost:8000');

        client.on('msg', function (msg) {
            expect(msg.data).to.equal('connected');
            client.disconnect();
            done();
        });
    });

    lab.after(function (done) {
        server.stop();
        done();
    });
});
