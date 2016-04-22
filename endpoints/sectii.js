module.exports = function(server, getConnection) {

    function getSectie(body) {
        return  {
            nume:         body.nume,
            id_facultate: body.id_facultate
        };
    }

    // Lista de setii
    server.get('/api/sectii', function(req, res) {

        console.log('pt facultatea', req.params.f);

        var conn = getConnection();

        var query = 'SELECT sectii.*, facultati.nume as fac_nume' +
            ' from sectii' +
            ' INNER JOIN facultati ON sectii.id_facultate=facultati.id';
        if(req.params.f) {
            query += ' where facultati.id=' + req.params.f;
        }
        query += ' order by sectii.nume';

        conn.query(query, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    // Adaugare sectie
    server.post('/api/sectii', function (req, res){

        var conn = getConnection();
        var sectie = getSectie(req.body);
        console.log('Adaugare sectie', sectie);
        conn.query('INSERT into sectii set ?', sectie, function(err, result) {

            conn.end();
            if (err) throw err;
            sectie.id = result.insertId;
            res.send(sectie);
        });
    });

    //Stergere din lista de sectii
    server.del('/api/sectii/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from sectii where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de sectii
    server.put('/api/sectii/:id', function (req, res){

        var conn = getConnection();
        var sectie = getSectie(req.body);

        conn.query('Update sectii set ? where id=?', [sectie, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};