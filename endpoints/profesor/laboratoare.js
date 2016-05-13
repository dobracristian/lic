module.exports = function(server, getConnection) {

    server.get('/api/profesor/laboratoare', function(req, res) {

        var conn = getConnection();
        var query = 'select * from laboratoare where id_prof=5';

        conn.query(query, function(err,rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);
        })
    })
};