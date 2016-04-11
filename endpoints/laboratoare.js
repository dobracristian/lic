module.exports = function(server, getConnection){

    //Lista laboratoare
    server.get('/api/laboratoare', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT laboratoare.*, cursuri.nume as curs_nume, profesori.nume as prof_nume,' +
            ' profesori.prenume as prof_pren, grupe.nr_grupa as nr_gr, serii.nume as ser_nume, ' +
            ' sectii.nume as sc_nume, semigrupe.nr_semigrupa as nr_sem' +
            ' from laboratoare' +
            ' Inner join cursuri on laboratoare.id_curs=cursuri.id' +
            ' Inner join semigrupe on laboratoare.id_semigrupa=semigrupe.id' +
            ' Inner join profesori on laboratoare.id_prof=profesori.id' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare laboratoare
    server.post('/api/laboratoare', function (req, res){

        var conn = getConnection();
        var laborator = {
            nume:         req.body.nume,
            id_curs:      req.body.id_curs,
            id_semigrupa: req.body.id_semigrupa,
            id_prof:      req.body.id_prof
        };
        console.log('Adaugare laborator', laborator);
        conn.query('INSERT into laboratoare set ?', laborator, function(err, result) {

            conn.end();
            if (err) throw err;
            laborator.id = result.insertId;
            res.send(laborator);
        });
    });
};
