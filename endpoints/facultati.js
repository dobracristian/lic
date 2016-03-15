module.exports = function(server, getConnection) {

    // Lita de facultati
    server.get('/api/facultati', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from facultati order by nume', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    // Adaugare facultate
    server.post('/api/facultati', function (req, res){

        var conn = getConnection();
        var facultate = {
            nume: req.body.nume
        };
        console.log("Adaugare facultate", facultate)
        conn.query('INSERT into facultati set ?', facultate, function(err, result) {

            conn.end();
            if (err) throw err;
            facultate.id = result.insertId;
            res.send(facultate);
        });
    });
};