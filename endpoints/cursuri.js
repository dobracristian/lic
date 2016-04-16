module.exports = function(server, getConnection){

    function getCurs(body) {
        return  {
            nume:       body.nume,
            id_serie:   body.id_serie,
            id_materie: body.id_materie,
            id_prof:    body.id_prof
        };
    }

    //Lista de cursuri
    server.get('/api/cursuri', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT cursuri.*, materii.nume as mat_nume, profesori.nume as prof_nume,' +
            ' profesori.prenume as prof_pren, sectii.nume as sc_nume, serii.nume as ser_nume' +
            ' from cursuri' +
            ' Inner join materii on cursuri.id_materie=materii.id' +
            ' Inner join serii on cursuri.id_serie=serii.id' +
            ' Inner join profesori on cursuri.id_prof=profesori.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare cursuri
    server.post('/api/cursuri', function (req, res){

        var conn = getConnection();
        var curs = getCurs(req.body);
        console.log('Adaugare curs', curs);
        conn.query('INSERT into cursuri set ?', curs, function(err, result) {

            conn.end();
            if (err) throw err;
            cursuri.id = result.insertId;
            res.send(curs);
        });
    });

    //Stergere din lista de cursuri
    server.del('/api/cursuri/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from cursuri where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de cursuri
    server.put('/api/cursuri/:id', function (req, res){

        var conn = getConnection();
        var curs = getCurs(req.body);

        conn.query('Update cursuri set ? where id=?', [curs, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};