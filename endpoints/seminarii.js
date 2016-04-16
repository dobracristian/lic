module.exports = function(server, getConnection){

    function getSeminar(body) {
        return  {
            nume:     body.nume,
            id_curs:  body.id_curs,
            id_grupa: body.id_grupa,
            id_prof:  body.id_prof
        };
    }

    //Lista seminarii
    server.get('/api/seminarii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT seminarii.*,cursuri.nume as curs_nume, profesori.nume as prof_nume,' +
            ' profesori.prenume as prof_pren, grupe.nr_grupa as nr_gr, serii.nume as ser_nume, ' +
            ' sectii.nume as sc_nume' +
            ' from seminarii' +
            ' Inner join cursuri on seminarii.id_curs=cursuri.id' +
            ' Inner join grupe on seminarii.id_grupa=grupe.id' +
            ' Inner join profesori on seminarii.id_prof=profesori.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            console.log('Data received from Db: ', rows);
            res.send(rows);
        });
    });

    //Adaugare seminarii
    server.post('/api/seminarii', function (req, res){

        var conn = getConnection();
        var seminar = getSeminar(req.body);
        console.log('Adaugare seminar', seminar);
        conn.query('INSERT into seminarii set ?', seminar, function(err, result) {

            conn.end();
            if (err) throw err;
            seminar.id = result.insertId;
            res.send(seminar);
        });
    });

    //Stergere din lista de seminarii
    server.del('/api/seminarii/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from seminarii where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de seminarii
    server.put('/api/seminarii/:id', function (req, res){

        var conn = getConnection();
        var seminar = getSeminar(req.body);

        conn.query('Update seminarii set ? where id=?', [seminar, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};
