module.exports = function(server, getConnection){

    function getLab(body) {
        return  {
            nume:         body.nume,
            id_curs:      body.id_curs,
            id_semigrupa: body.id_semigrupa,
            id_prof:      body.id_prof
        };
    }

    //Lista laboratoare
    server.get('/api/laboratoare', function(req, res) {

        var conn = getConnection();
        var query = 'SELECT laboratoare.*, cursuri.nume as curs_nume, profesori.nume as prof_nume,' +
            ' profesori.prenume as prof_pren, grupe.nr_grupa as nr_gr, serii.nume as ser_nume, ' +
            ' sectii.nume as sc_nume, semigrupe.nr_semigrupa as nr_sem, facultati.nume as fac_nume' +
            ' from laboratoare' +
            ' Inner join cursuri on laboratoare.id_curs=cursuri.id' +
            ' Inner join semigrupe on laboratoare.id_semigrupa=semigrupe.id' +
            ' Inner join profesori on laboratoare.id_prof=profesori.id' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join facultati on sectii.id_facultate=facultati.id';
        var conditions = [];
        var params = [];
        if(req.params.sem){
            conditions.push('semigrupe.id=?');
            params.push(req.params.sem);
        }
        else if(req.params.gr){
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

        if(req.params.curs) {
            conditions.push('cursuri.id=?');
            params.push(req.params.curs);
        }

        if(req.params.prof) {
            conditions.push('profesori.id=?');
            params.push(req.params.prof);
        }

        if(conditions.length) {
            query += ' where ' + conditions.join(' and ');
        }
        query += ' order by laboratoare.nume';
        conn.query(query, params, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare laboratoare
    server.post('/api/laboratoare', function (req, res){

        var conn = getConnection();
        var laborator = getLab(req.body);
        console.log('Adaugare laborator', laborator);
        conn.query('INSERT into laboratoare set ?', laborator, function(err, result) {

            conn.end();
            if (err) throw err;
            laborator.id = result.insertId;
            res.send(laborator);
        });
    });

    //Stergere din lista de laboratoare
    server.del('/api/laboratoare/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from laboratoare where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de laboratoare
    server.put('/api/laboratoare/:id', function (req, res){

        var conn = getConnection();
        var laborator = getLab(req.body);

        conn.query('Update laboratoare set ? where id=?', [laborator, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};
