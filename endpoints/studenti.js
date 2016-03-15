module.exports = function(server, getConnection) {

    // Lista de studenti
    server.get('/api/studenti', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from studenti order by nume, prenume', function(err, rows){

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