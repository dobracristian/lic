module.exports = function(server, getConnection){

    //Lista de cursuri
    server.get('/api/cursuri', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from cursuri order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare cursuri
    server.post('/api/cursuri', function (req, res){

        var conn = getConnection();
        var curs = {
            nume:       req.body.nume,
            id_serie:   req.body.id_serie,
            id_materie: req.body.id_materie,
            id_prof:    req.body.id_prof
        };
        console.log('Adaugare curs', curs);
        conn.query('INSERT into cursuri set ?', curs, function(err, result) {

            conn.end();
            if (err) throw err;
            cursuri.id = result.insertId;
            res.send(curs);
        });
    });
};