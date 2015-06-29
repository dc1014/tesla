var Code = require('code');
var io = require('socket.io-client');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var server = require('./../server');

var expect = Code.expect;
var test = lab.test;

lab.experiment('socket connection', function () {
    lab.before(function (done) {
        server.start();
        done();
    });

    test('should not connect over http', function (done) {
        expect(io('http://localhost:8000').connected).to.equal(false);
        done();
    });

    test('should emit msg event', function (done) {
        var client = io('https://localhost:8000');

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
