module.exports = function(server, getConnection) {

    server.get('/api/profesor/seminarii', function(req, res) {

        var conn = getConnection();
        var query = 'select seminarii.*, materii.abreviere as mat_abr from seminarii ' +
            ' Inner join cursuri on seminarii.id_curs=cursuri.id ' +
            ' Inner join materii on cursuri.id_materie=materii.id ' +
            ' where seminarii.id_prof=5';

        conn.query(query, function(err, rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);

        })
    })
};