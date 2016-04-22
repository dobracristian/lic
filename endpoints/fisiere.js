module.exports = function(server, getConnection){

    server.get('/api/fisiere', function(req, res) {

        var conn = getConnection();
        var query = 'select * from fisiere ' +
            ' where id_curs=?';
        conn.query(query,[req.params.c], function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

};
