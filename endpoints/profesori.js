module.exports = function(server, getConnection){

    function getProf(body) {
        return  {
            nume:    body.nume,
            prenume: body.prenume,
            email:   body.email
        };
    }

    //Lista profesori
    server.get('/api/profesori', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT profesori.*, useri.email as email ' +
            ' from profesori ' +
            ' left outer join useri on profesori.id=useri.id_prof ' +
            ' order by nume, prenume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });

    });

    //Adaugare profesor
    server.post('/api/profesori', function (req, res){

        var conn = getConnection();
        var profesor = getProf(req.body);
        console.log('Adaugare profesor', profesor);
        conn.query('INSERT into profesori set ?', profesor, function(err, result) {

            conn.end();
            if (err) throw err;
            profesor.id = result.insertId;
            res.send(profesor);
        });
    });

    //Stergere din lista de profesori
    server.del('/api/profesori/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from profesori where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de profesori
    server.put('/api/profesori/:id', function (req, res){

        var conn = getConnection();
        var profesor = getProf(req.body);

        conn.query('Update profesori set ? where id=?', [profesor, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });

    //Modificare parola
    server.post('/api/profesori/:id/parola', function (req, res){

        var conn = getConnection();
        var bcrypt = require('bcrypt-nodejs');

        var parola = req.body.parola;
        var salt = bcrypt.genSaltSync(6);
        parola = bcrypt.hashSync(parola, salt);

        conn.query('replace useri set ?', {
            email: req.body.email,
            parola: parola,
            tip: 'prof',
            id_prof: req.params.id
        }, function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Parola schimbata');
        });
    });
};