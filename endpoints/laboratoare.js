module.exports = function(server, getConnection){

    //Lista laboratoare
    server.get('/api/laboratoare', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from laboratoare order by nume', function(err, rows){

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
