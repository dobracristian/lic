module.exports = function(server) {

    server.post('api/logout', function (req, res) {

        var auth = require('../auth.js');

        auth.logout(req, res);
    });
};