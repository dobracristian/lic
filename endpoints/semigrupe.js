module.exports = function(server, getConnection){

    //Lista semigrupe
    server.get('/api/semigrupe', function(req, res) {

        var conn = getConnection();

        var query ='SELECT semigrupe.*, grupe.nr_grupa as gr_nr, serii.nume as ser_nume,' +
            ' sectii.nume as sc_nume, facultati.nume as fac_nume' +
            ' from semigrupe' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join facultati on sectii.id_facultate=facultati.id';
        if(req.params.gr){
            query += ' where id_grupa=' + req.params.gr;
        }
        query += ' order by nr_semigrupa'

        conn.query(query, function(err, rows){

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