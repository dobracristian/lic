module.exports = function(server, getConnection) {

    // Lista de studenti
    server.get('/api/studenti', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT studenti.*, semigrupe.nr_semigrupa as sem_nr, grupe.nr_grupa as gr_nr,' +
            ' serii.nume as ser_nume, sectii.nume as sc_nume, facultati.nume as fac_nume' +
            ' from studenti' +
            ' Inner join semigrupe on studenti.id_semigrupa=semigrupe.id' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join facultati on sectii.id_facultate=facultati.id';
        if(req.params.sem){
            query += ' where id_semigrupa='+ req.params.sem;
        }
        query += ' order by nume, prenume';

        conn.query(query, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    // Adaugare student
    server.post('/api/studenti', function (req, res){

        var conn = getConnection();
        var student = {
            nume:         req.body.nume,
            prenume:      req.body.prenume,
            id_semigrupa: req.body.id_semigrupa
        };
        console.log('Adaugare student', student);
        conn.query('INSERT into studenti set ?', student, function(err, result) {

            conn.end();
            if (err) throw err;
            student.id = result.insertId;
            res.send(student);
        });
    });

};