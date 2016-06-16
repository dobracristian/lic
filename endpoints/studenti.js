module.exports = function(server, getConnection) {

    function getStudent(body) {
        return  {
            nume:         body.nume,
            prenume:      body.prenume,
            id_semigrupa: body.id_semigrupa,
            email:        body.email
        };
    }

    // Lista de studenti
    server.get('/api/studenti', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT studenti.*, semigrupe.nume as sem_nr, grupe.nume as gr_nr,' +
            ' grupe.id as gr_id, serii.id as ser_id, serii.an as ser_an, ' +
            ' serii.nume as ser_nume, sectii.nume as sc_nume, sectii.id as sc_id,' +
            ' facultati.nume as fac_nume, facultati.id as fac_id, ani.nume as an_nume, useri.email as email ' +
            ' from studenti' +
            ' Inner join semigrupe on studenti.id_semigrupa=semigrupe.id' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join ani on serii.an=ani.nr' +
            ' Inner join facultati on sectii.id_facultate=facultati.id' +
            ' left outer join useri on studenti.id=useri.id_stud';
        var conditions = [];
        var params = [];
        if(req.params.sgr){
            conditions.push('semigrupe.id=?');
            params.push(req.params.sgr);
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

        if(req.params.an) {
            conditions.push('serii.an=?');
            params.push(req.params.an);
        }

        if(conditions.length){
            query += ' where '+ conditions.join(' and ');
        }
        query += ' order by studenti.nume, studenti.prenume';

        conn.query(query, params, function(err, rows){

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

    //Modificare parola
    server.post('/api/studenti/:id/parola', function (req, res){

        var conn = getConnection();
        var bcrypt = require('bcrypt-nodejs');

        var parola = req.body.parola;
        var salt = bcrypt.genSaltSync(6);
        parola = bcrypt.hashSync(parola, salt);

        conn.query('replace useri set ?', {
            email: req.body.email,
            parola: parola,
            tip: 'stud',
            id_stud: req.params.id
        }, function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Parola schimbata');
        });
    });
};