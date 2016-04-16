module.exports = function(server, getConnection) {

    function getFac(body) {
        return  {
            nume: body.nume
        };
    }

    // Lita de facultati
    server.get('/api/facultati', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from facultati order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    // Adaugare facultate
    server.post('/api/facultati', function (req, res){

        var conn = getConnection();
        var facultate = getFac(req.body);
        console.log("Adaugare facultate", facultate);
        conn.query('INSERT into facultati set ?', facultate, function(err, result) {

            conn.end();
            if (err) throw err;
            facultate.id = result.insertId;
            res.send(facultate);
        });
    });

    //Stergere din lista de facultati
    server.del('/api/facultati/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from facultati where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de facultati
    server.put('/api/facultati/:id', function (req, res){

        var conn = getConnection();
        var facultate = getFac(req.body);

        conn.query('Update facultati set ? where id=?', [facultate, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};