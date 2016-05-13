module.exports = function(server, getConnection) {

    server.get('/api/profesor/seminarii', function(req, res) {

        var conn = getConnection();
        var query = 'select * from seminarii where id_prof=5';

        conn.query(query, function(err, rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);

        })
    })
};