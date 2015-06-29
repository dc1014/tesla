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

    // test('should not connect over http', function (done) {
    //     var client = io('http://localhost:8000');
    //     client.on('reconnect_attempt', function () {
    //         console.log('hi');
    //         done();
    //     });
    // });

    // test('should connect over https', function (done) {
    //     var client = io('https://localhost:8000');

    //     client.disconnect();
    //     done();
    // });

    test('should emit msg event', function (done) {
        var client = io('https://localhost:8000');
        client.on('msg', function (msg) {
            expect(msg.data).to.equal('connected');
            expect(client.connected).to.equal(true);
            client.disconnect();
            done();
        });
    });

    lab.after(function (done) {
        server.stop();
        done();
    });
});
