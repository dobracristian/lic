module.exports = function(server, getConnection){

    //Lista profesori
    server.get('/api/profesori', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from profesori order by nume, prenume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });

    });

    //Adaugare profesor
    server.post('/api/profesori', function (req, res){

        var conn = getConnection();
        var profesor = {
            nume:    req.body.nume,
            prenume: req.body.prenume
        };
        console.log('Adaugare profesor', profesor);
        conn.query('INSERT into profesori set ?', profesor, function(err, result) {

            conn.end();
            if (err) throw err;
            profesor.id = result.insertId;
            res.send(profesor);
        });
    });
};