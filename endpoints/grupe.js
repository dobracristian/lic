module.exports = function(server, getConnection){

    //Lista de grupe
    server.get('/api/grupe', function(req, res) {

        var conn = getConnection();

        var query = 'SELECT grupe.*, serii.nume as ser_nume, sectii.nume as sc_nume, facultati.nume as fac_nume'+
                ' from grupe' +
                ' Inner join serii on grupe.id_serie=serii.id'+
                ' Inner join sectii on serii.id_sectie=sectii.id'+
                ' Inner join facultati on sectii.id_facultate=facultati.id';
        if(req.params.ser) {
            query +=' where id_serie=' + req.params.ser;
        }
        else if(req.params.sc) {
            query +=' where id_sectie=' + req.params.sc;
        }
        else if(req.params.f) {
            query +=' where id_facultate=' + req.params.f;
        }
        query+= ' order by nr_grupa';

        conn.query(query, function(err, rows){

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
