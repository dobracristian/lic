module.exports = function(server, getConnection){

    function getSerie(body) {
        return  {
            nume:      body.nume,
            id_sectie: body.id_sectie,
            an:        body.an
        };
    }

    //Lista de serii
    server.get('/api/serii', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT serii.*, sectii.nume as sc_nume, facultati.nume as fac_nume, facultati.id as fac_id, ' +
                ' ani.nume as an_nume, ani.nr as an_nr'+
                ' from serii'+
                ' Inner join sectii on serii.id_sectie=sectii.id' +
                ' Inner join ani on serii.an=ani.nr'+
                ' Inner join facultati on sectii.id_facultate=facultati.id';
        var conditions = [];
        var params = [];
        if(req.params.an) {
            conditions.push('serii.an=?');
            params.push(req.params.an);
        }
        if(req.params.sc) {
            conditions.push('sectii.id=?');
            params.push(req.params.sc);
        }
        else if(req.params.f) {
            conditions.push('facultati.id=?');
            params.push(req.params.f);
        }
        if(conditions.length){
            query += ' where '+ conditions.join(' and ');
        }
        query += ' order by serii.nume, serii.an';

        conn.query(query, params, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

    //Adaugare serii
    server.post('/api/serii', function (req, res){

        var conn = getConnection();
        var serie = getSerie(req.body);
        conn.query('INSERT into serii set ?', serie, function(err, result) {

            conn.end();
            if (err) throw err;
            serie.id = result.insertId;
            res.send(serie);
        });
    });

    //Stergere din lista de serii
    server.del('/api/serii/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from serii where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare lista de serii
    server.put('/api/serii/:id', function (req, res){

        var conn = getConnection();
        var serie = getSerie(req.body);

        conn.query('Update serii set ? where id=?', [serie, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};