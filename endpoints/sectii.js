module.exports = function(server, getConnection) {

    // Lista de setii
    server.get('/api/sectii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from sectii oredr by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    // Adaugare sectie
    server.post('/api/sectii', function (req, res){

        var conn = getConnection();
        var sectie = {
            nume:         req.body.nume,
            id_facultate: req.body.id_facultate
        };
        console.log('Adaugare sectie', sectie);
        conn.query('INSERT into sectii set ?', sectie, function(err, result) {

            conn.end();
            if (err) throw err;
            sectie.id = result.insertId;
            res.send(sectie);
        });
    });
};