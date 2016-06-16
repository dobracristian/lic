module.exports = function(server, getConnection) {

    server.post('api/login', function(req, res) {

        var conn = getConnection();
        var username = req.body.username;
        var parola = req.body.parola;

        var query = ' Select u.*,semigrupe.id_grupa , grupe.id_serie, ' +
            ' s.*, u.id ' +
            ' from useri u ' +
            ' left outer join studenti s on u.id_stud=s.id'+
            ' left outer join semigrupe on s.id_semigrupa=semigrupe.id' +
            ' left outer join grupe on semigrupe.id_grupa=grupe.id' +
            ' where u.email=?';

        conn.query(query, [username], function(err, result) {

            conn.end();
            if (err) throw err;

            if(result.length) {
                var bcrypt = require('bcrypt-nodejs');
                var auth = require('../auth.js');
                var parolaBuna = bcrypt.compareSync(parola, result[0].parola);

                if(parolaBuna) {
                    auth.login(result[0], res);
                    res.send(result[0]);
                }else{
                    res.send();
                }
            } else {
                res.send();
            }

        });

    });

};