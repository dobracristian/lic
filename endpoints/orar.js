module.exports = function(server, getConnection) {

    function getOrar(body) {
        return  {
            saptamana: body.saptamana,
            zi:        body.zi,
            ora_start: body.ora_start,
            ora_sf:    body.ora_sf,
            sala:      body.sala,
            id_curs:   body.id_curs,
            id_lab:    body.id_lab,
            id_sem:    body.id_sem
        };
    }

    //Orar
    server.get('api/orar', function(req, res) {

        var conn = getConnection();
        var query = 'Select orar.*, coalesce(cursuri.nume, laboratoare.nume, seminarii.nume) as nume,' +
            ' cursuri.nume as curs_nume, laboratoare.nume as lab_nume, seminarii.nume as sem_nume,' +
            ' m.abreviere as abr, ora_sf-ora_start as durata, p.nume as prof_nume' +
            ' from orar ' +
            ' left outer join cursuri on orar.id_curs=cursuri.id' +
            ' left outer join laboratoare on orar.id_lab=laboratoare.id' +
            ' left outer join seminarii on orar.id_sem=seminarii.id'+
            ' left outer join cursuri curs_ls on laboratoare.id_curs=curs_ls.id or seminarii.id_curs=curs_ls.id'+
            ' left outer join materii m on cursuri.id_materie=m.id or curs_ls.id_materie=m.id' +
            ' left outer join profesori p on p.id=cursuri.id_prof or p.id=laboratoare.id_prof or p.id=seminarii.id_prof';
        if(req.params.sapt){
            query += ' where orar.saptamana = ?';
        }
        query += ' order by zi, ora_start, ora_sf desc, id';

        console.log('Q', query);

        conn.query(query, [req.params.sapt], function(err, rows) {

            conn.end();
            if(err) throw err;
            res.send(rows);
        })
    })

    // Adaugare in orar
    server.post('/api/orar', function (req, res){

        var conn = getConnection();
        var ora = getOrar(req.body);
        console.log("Adaugare an", ora);
        conn.query('INSERT into orar set ?', ora, function(err, result) {

            conn.end();
            if (err) throw err;
            ora.id = result.insertId;
            res.send(ora);
        });
    });

    //Stergere din orar
    server.del('/api/orar/:id', function (request, response){

        var conn = getConnection();

        conn.query('DELETE from orar where id=?', [request.params.id], function(err) {
            conn.end();
            if (err) throw err;
            response.send(200, 'Deleted');
        });
    });

    //Editare orar
    server.put('/api/orar/:id', function (req, res){

        var conn = getConnection();
        var ora = getOrar(req.body);

        conn.query('Update orar set ? where id=?', [ora, req.params.id], function(err) {

            conn.end();
            if (err) throw err;
            res.send(200, 'Updated');
        });
    });
};