module.exports = function(server, getConnection){

    //Lista materii
    server.get('/api/materii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from materii order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare materie
    server.post('/api/materii', function (req, res){

        var conn = getConnection();
        var materie = {
            nume: req.body.nume
        };
        console.log('Adaugare materie', materie);
        conn.query('INSERT into materii set ?', materie, function(err, result) {

            conn.end();
            if (err) throw err;
            materie.id = result.insertId;
            res.send(materie);
        });
    });

};
