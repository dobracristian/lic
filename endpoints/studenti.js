module.exports = function(server, getConnection) {

    function getStudent(body) {
        return  {
            nume:         body.nume,
            prenume:      body.prenume,
            id_semigrupa: body.id_semigrupa
        };
    }

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
        else if(req.params.gr){
            query += ' where id_grupa=' + req.params.gr;
        }
        else if(req.params.ser) {
            query += ' where id_serie=' + req.params.ser;
        }
        else if(req.params.sc) {
            query += ' where id_sectie=' + req.params.sc;
        }
        else if(req.params.f) {
            query += ' where id_facultate=' + req.params.f;
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
        var student = getStudent(req.body);
        console.log('Adaugare student', student);
        conn.query('INSERT into studenti set ?', student, function(err, result) {

            conn.end();
            if (err) throw err;
            student.id = result.insertId;
            res.send(student);
        });
    });

    //Stergere din lista de studenti
    server.del('/api/studenti/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from studenti where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de studenti
    server.put('/api/studenti/:id', function (req, res){

        var conn = getConnection();
        var student = getStudent(req.body);

        conn.query('Update studenti set ? where id=?', [student, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });

};