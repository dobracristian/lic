module.exports = function(server, getConnection){

    //Lista seminarii
    server.get('/api/seminarii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from seminarii', function(err, rows){

            conn.end();
            if (err) throw err;
            console.log('Data received from Db: ', rows);
            res.send(rows);
        });
    });

    //Adaugare seminarii
    server.post('/api/seminarii', function (req, res){

        var conn = getConnection();
        var seminar = {
            nume:     req.body.nume,
            id_curs:  req.body.id_curs,
            id_grupa: req.body.id_grupa,
            id_prof:  req.body.id_prof
        };
        console.log('Adaugare seminar', seminar);
        conn.query('INSERT into seminarii set ?', seminar, function(err, result) {

            conn.end();
            if (err) throw err;
            seminar.id = result.insertId;
            res.send(seminar);
        });
    });
};
