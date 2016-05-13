module.exports = function(server, getConnection){

    server.get('/api/student/curs-lab-sem', function(req, res) {

        var conn = getConnection();
        var query = 'SELECT c.nume as curs_nume, c.id as curs_id, lab.nume as lab_nume, lab.id as lab_id, ' +
            ' sem.nume as sem_nume, sem.id as sem_id' +
            ' from studenti std' +
            ' inner join semigrupe sgr on std.id_semigrupa=sgr.id' +
            ' Inner join grupe gr on sgr.id_grupa=gr.id' +
            ' Inner join serii ser on gr.id_serie=ser.id' +
            ' Inner join cursuri c on c.id_serie=ser.id' +
            ' left outer join laboratoare lab on lab.id_curs=c.id and lab.id_semigrupa=std.id_semigrupa' +
            ' left outer join seminarii sem on sem.id_curs=c.id and sem.id_grupa=gr.id' +
            ' Where std.id=18';
        conn.query(query, function(err, rows){

            conn.end();
            if (err) throw err;
            res.send(rows);
        });
    });

};
