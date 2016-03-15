module.exports = function(server, getConnection){

    //Lista semigrupe
    server.get('/api/semigrupe', function(req, res) {

        var conn = getConnection();
        conn.query('SELECT * from semigrupe order by nr_semigrupa', function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare semigrupa
    server.post('/api/semigrupe', function (req, res){

        var conn = getConnection();
        var semigrupa = {
            nr_semigrupa: req.body.nr_semigrupa,
            id_grupa:     req.body.id_grupa
        };
        console.log('Adaugare semgirupa', semigrupa);
        conn.query('INSERT into semigrupe set ?', semigrupa, function(err, result) {

            conn.end();
            if (err) throw err;
            semigrupa.id = result.insertId;
            res.send(semigrupa);
        });
    });
};