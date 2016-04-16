module.exports = function(server, getConnection){

    function getSemigr(body) {
        return  {
            nr_semigrupa: body.nr_semigrupa,
            id_grupa:     body.id_grupa
        };
    }

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
        else if(req.params.ser) {
            query += ' where id_serie=' + req.params.ser;
        }
        else if(req.params.sc) {
            query += ' where id_sectie=' + req.params.sc;
        }
        else if(req.params.f) {
            query += ' where id_facultate=' + req.params.f;
        }
        query += ' order by nr_semigrupa';

        conn.query(query, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare semigrupa
    server.post('/api/semigrupe', function (req, res){

        var conn = getConnection();
        var semigrupa = getSemigr(req.body);
        console.log('Adaugare semgirupa', semigrupa);
        conn.query('INSERT into semigrupe set ?', semigrupa, function(err, result) {

            conn.end();
            if (err) throw err;
            semigrupa.id = result.insertId;
            res.send(semigrupa);
        });
    });

    //Stergere din lista de semigrupe
    server.del('/api/semigrupe/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from semigrupe where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de semigrupe
    server.put('/api/semigrupe/:id', function (req, res){

        var conn = getConnection();
        var semigrupa = getSemigr(req.body);

        conn.query('Update semigrupe set ? where id=?', [semigrupa, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};