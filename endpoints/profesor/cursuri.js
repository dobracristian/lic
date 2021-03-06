module.exports = function(server, getConnection){

    server.get('/api/profesor/cursuri', function(req, res) {

        var auth = require('../../auth.js');
        var user = auth.getUser(req);

        var conn = getConnection();
        var query = 'SELECT cursuri.*, materii.abreviere as mat_abr from cursuri '+
            ' Inner join materii on cursuri.id_materie=materii.id ' +
            ' where id_prof=?';

        conn.query(query, [user.if_prof], function(err, rows){

            conn.end();
            if(err) throw err;
            res.send(rows);
        })
    })

};