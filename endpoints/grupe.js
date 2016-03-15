module.exports = function(server, getConnection){

    //Lista de grupe
    server.get('/api/grupe', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from grupe order by nr_grupa', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare grupa
    server.post('/api/grupe', function (req, res){

        var conn = getConnection();
        var grupa = {
            nr_grupa: req.body.nr_grupa,
            id_serie: req.body.id_serie
        };
        console.log('Adaugare grupa', grupa);
        conn.query('INSERT into grupe set ?', grupa, function(err, result) {

            conn.end();
            if (err) throw err;
            grupa.id = result.insertId;
            res.send(grupa);
        });
    });
};
