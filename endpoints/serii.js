module.exports = function(server, getConnection){

    function getSerie(body) {
        return  {
            nume:      body.nume,
            id_sectie: body.id_sectie
        };
    }

    //Lista de serii
    server.get('/api/serii', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT serii.*, sectii.nume as sc_nume, facultati.nume as fac_nume'+
                ' from serii'+
                ' Inner join sectii on serii.id_sectie=sectii.id'+
                ' Inner join facultati on sectii.id_facultate=facultati.id';
        if(req.params.sc) {
            query += ' where id_sectie=' + req.params.sc;
        }
        else if(req.params.f) {
            query += ' where id_facultate=' + req.params.f;
        }
        query += ' order by nume';

        conn.query(query, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare serii
    server.post('/api/serii', function (req, res){

        var conn = getConnection();
        var serii = getSerie(req.body);
        conn.query('INSERT into serii set ?', serii, function(err, result) {

            conn.end();
            if (err) throw err;
            serii.id = result.insertId;
            res.send(serii);
        });
    });

    //Stergere din lista de serii
    server.del('/api/serii/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from serii where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de serii
    server.put('/api/serii/:id', function (req, res){

        var conn = getConnection();
        var serii = getSerie(req.body);

        conn.query('Update serii set ? where id=?', [serii, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};