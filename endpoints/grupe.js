module.exports = function(server, getConnection){

    function getGrupe(body) {
        return  {
            nr_grupa: body.nr_grupa,
            id_serie: body.id_serie
        };
    }

    //Lista de grupe
    server.get('/api/grupe', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT grupe.*, serii.nume as ser_nume, sectii.nume as sc_nume, facultati.nume as fac_nume,' +
                ' facultati.id as fac_id, sectii.id as id_sectie' +
                ' from grupe' +
                ' Inner join serii on grupe.id_serie=serii.id'+
                ' Inner join sectii on serii.id_sectie=sectii.id'+
                ' Inner join facultati on sectii.id_facultate=facultati.id';
        var conditions = [];
        var params = [];
        if(req.params.ser) {
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
        if(conditions.length) {
            query += ' where '+ conditions.join(' and ');
        }
        query+= ' order by grupe.nr_grupa';

        conn.query(query, params, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare grupa
    server.post('/api/grupe', function (req, res){

        var conn = getConnection();
        var grupa = getGrupe(req.body);
        console.log('Adaugare grupa', grupa);
        conn.query('INSERT into grupe set ?', grupa, function(err, result) {

            conn.end();
            if (err) throw err;
            grupa.id = result.insertId;
            res.send(grupa);
        });
    });

    //Stergere din lista de grupe
    server.del('/api/grupe/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from grupe where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de grupe
    server.put('/api/grupe/:id', function (req, res){

        var conn = getConnection();
        var grupa = getGrupe(req.body);

        conn.query('Update grupe set ? where id=?', [grupa, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};
