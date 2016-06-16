module.exports = function(server, getConnection) {

    server.get('/api/profesor/laboratoare', function(req, res) {

        var auth = require('../../auth.js');
        var user = auth.getUser(req);

        var conn = getConnection();
        var query = 'select laboratoare.*, materii.abreviere as mat_abr from laboratoare '+
            ' Inner join cursuri on laboratoare.id_curs=cursuri.id ' +
            ' Inner join materii on cursuri.id_materie=materii.id ' +
            'where laboratoare.id_prof=?';

        conn.query(query, [user.id_prof], function(err,rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);
        })
    })
};