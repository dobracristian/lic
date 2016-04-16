module.exports = function(server, getConnection){

    function getMaterie(body) {
        return  {
            nume: body.nume
        };
    }

    //Lista materii
    server.get('/api/materii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from materii order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare materie
    server.post('/api/materii', function (req, res){

        var conn = getConnection();
        var materie = getMaterie(req.body);
        console.log('Adaugare materie', materie);
        conn.query('INSERT into materii set ?', materie, function(err, result) {

            conn.end();
            if (err) throw err;
            materie.id = result.insertId;
            res.send(materie);
        });
    });

    //Stergere din lista de materii
    server.del('/api/materii/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from materii where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de materii
    server.put('/api/materii/:id', function (req, res){

        var conn = getConnection();
        var materie = getMaterie(req.body);

        conn.query('Update materii set ? where id=?', [materie, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};
