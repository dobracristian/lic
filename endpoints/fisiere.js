module.exports = function(server, getConnection){

    function getFisier(body) {
        return {
            nume: body.nume,
            url: body.url,
            tip: body.tip,
            id_curs: body.id_curs,
            pentru: body.pentru,
            id_prof: body.id_prof
        }
    }

    server.get('/api/fisiere', function(req, res) {

        var conn = getConnection();
        var query = 'select * from fisiere where id_curs=? and pentru=? and id_prof=? ' +
            ' order by id' ;

        var params= [req.params.c, req.params.pentru, req.params.prof];
        conn.query(query, params, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    server.post('/api/fisiere', function(req, res) {

        var conn = getConnection();
        var fisier = getFisier(req.body);

        conn.query('Insert into fisiere set ?', fisier, function(err, result) {

            conn.end();
            if (err) throw  err;
            fisier.id = result.insertId;
            res.send(fisier);
        });
    });

    server.del('/api/fisiere/:id', function(req, res) {

        var conn = getConnection();

        conn.query('delete from fisiere where id=?', [req.params.id], function(err) {

            conn.end();
            if (err)throw err;
            res.send(200, 'Deleted');
        });
    });

    server.put('/api/fisiere/:id', function(req, res) {

        var conn = getConnection();
        var fisier = getFisier(req.body);

        conn.query('update fisiere set ? where id=?', [fisier, req.params.id], function(err) {

            conn.end();
            if(err) throw err;
            res.send(200, 'Update');
        });
    });

};
