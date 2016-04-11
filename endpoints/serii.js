module.exports = function(server, getConnection){

    //Lista de serii
    server.get('/api/serii', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT serii.*, sectii.nume as sc_nume, facultati.nume as fac_nume'+
                ' from serii'+
                ' Inner join sectii on serii.id_sectie=sectii.id'+
                ' Inner join facultati on sectii.id_facultate=facultati.id';
        if(req.params.sc) {
            query += ' where id_sectie=' + req.params.sc;
        }
        if(req.params.f) {
            query += ' and id_facultate=' + req.params.f;
        }
        query += ' order by nume';

        conn.query(query, function(err, rows){

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