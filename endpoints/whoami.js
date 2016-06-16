module.exports = function(server) {

    server.get('api/whoami', function(req, res) {

        var auth = require('../auth.js');

        res.send(auth.getUser(req));

    });

};