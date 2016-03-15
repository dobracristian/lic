module.exports = function(server, getConnection){

    //Lista de serii
    server.get('/api/serii', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from serii order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare serii
    server.post('/api/serii', function (req, res){

        var conn = getConnection();
        var serii = {
            nume:      req.body.nume,
            id_sectie: req.body.id_sectie
        };
        conn.query('INSERT into serii set ?', serii, function(err, result) {

            conn.end();
            if (err) throw err;
            serii.id = result.insertId;
            res.send(serii);
        });
    });
};