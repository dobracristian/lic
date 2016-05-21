module.exports = function(server, getConnection) {

    function getAn(body) {
        return  {
            nume: body.nume,
            nr:   body.nr
        };
    }

    //Lista de ani
    server.get('api/ani', function(req, res) {

        var conn = getConnection();
        var query = 'SELECT * from ani order by nr';

        conn.query(query, function(err, rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);
        })
    });

    // Adaugare an
    server.post('/api/ani', function (req, res){

        var conn = getConnection();
        var an = getAn(req.body);
        console.log("Adaugare an", an);
        conn.query('INSERT into ani set ?', an, function(err, result) {

            conn.end();
            if (err) throw err;
            an.id = result.insertId;
            res.send(an);
        });
    });

    //Stergere din lista de ani
    server.del('/api/ani/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from ani where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de ani
    server.put('/api/ani/:id', function (req, res){

        var conn = getConnection();
        var an = getAn(req.body);

        conn.query('Update ani set ? where id=?', [an, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};