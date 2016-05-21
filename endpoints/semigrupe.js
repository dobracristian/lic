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

        var query ='SELECT semigrupe.*, grupe.nr_grupa as gr_nr, serii.nume as ser_nume, serii.an as ser_an, ' +
            ' sectii.nume as sc_nume, facultati.nume as fac_nume, facultati.id as fac_id,' +
            ' sectii.id as id_sectie, serii.id as id_serie, ani.nume as an_nume' +
            ' from semigrupe' +
            ' Inner join grupe on semigrupe.id_grupa=grupe.id' +
            ' Inner join serii on grupe.id_serie=serii.id' +
            ' Inner join sectii on serii.id_sectie=sectii.id' +
            ' Inner join ani on serii.an=ani.nr' +
            ' Inner join facultati on sectii.id_facultate=facultati.id';
        var conditions = [];
        var params = [];
        if(req.params.gr){
            conditions.push('grupe.id=?');
            params.push(req.params.gr);
        }
        else if(req.params.ser) {
            conditions.push('serii.id=?');
            params.push(req.params.ser);
        }
        else if(req.params.sc) {
            conditions.push('sectii.id=?');
            params.push(req.params.sc);
        }
        else if(req.params.f) {
            conditions.push('facultati.id=?');
            params.push(req.params.f);
        }

        if(req.params.an) {
            conditions.push('serii.an=?');
            params.push(req.params.an);
        }

        if(conditions.length) {
            query += ' where '+ conditions.join(' and ');
        }
        query += ' order by semigrupe.nr_semigrupa';

        conn.query(query, params, function(err, rows){

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