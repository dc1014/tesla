var jwt = require('jsonwebtoken');
var creds = require('./credentials.json');

var profile = {
    first_name: 'John',
    last_name: 'Doe',
    name: 'John Doe',
    email: 'john@doe.com',
    id: 123
};

console.log(jwt.sign(profile, creds.secret, {expiresInMinutes: 60 * 100}));
