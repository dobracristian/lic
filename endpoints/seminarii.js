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
        var query = 'SELECT seminarii.*,cursuri.nume as curs_nume, profesori.nume as prof_nume,' +
            ' profesori.prenume as prof_pren, grupe.nr_grupa as nr_gr, serii.nume as ser_nume, ' +
            ' sectii.nume as sc_nume, facultati.nume as fac_nume' +
            ' from seminarii' +
            ' Inner join cursuri on seminarii.id_curs=cursuri.id' +
            ' Inner join grupe on seminarii.id_grupa=grupe.id' +
            ' Inner join profesori on seminarii.id_prof=profesori.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join facultati on sectii.id_facultate=facultati.id';

        var conditions = [];
        var params = [];
        if(req.params.gr) {
            conditions.push('grupe.id=?');
            params.push(req.params.gr);
        }
        else if(req.params.ser) {
            conditions.push('serii.id=?');
            params.push(req.params.ser);
        }
        else if(req.params.sc) {
            conditions.push('sectii.id=?');
            params.push(req.params.sc);
        }
        else if(req.params.f) {
            conditions.push('facultati.id=?');
            params.push(req.params.f);
        }
        if(req.params.prof) {
            conditions.push('profesori.id=?');
            params.push(req.params.prof);
        }
        if(req.params.curs) {
            conditions.push('cursuri.id=?');
            params.push(req.params.curs);
        }
        if(conditions.length){
            query += ' where '+ conditions.join(' and ');
        }
        query +=' order by seminarii.nume';
        conn.query(query, params, function(err, rows){

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

    server.get('/api/seminarii/:id', function(req, res) {

        var conn = getConnection();
        var query = 'select * from seminarii where id=? ';

        conn.query(query, [req.params.id], function(err, rows) {
            conn.end();
            if (err) throw err;
            res.send(200, rows[0]);
        })
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
