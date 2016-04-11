console.log('salut');

var restify = require('restify');
//console.log('Modul', restify);

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());

//server.get('/', function(req, res, next) {
//    res.send('Salut!');
//    next();
//});

server.get(/^(?!\/api\/).+/, restify.serveStatic({
    directory: './public',
    default: 'index.html'
}));

var mysql = require('mysql');

function getConnection() {
    var connection = mysql.createConnection({
        host: 8080,
        user: 'root',
        password: 'root',
        database: 'sigad'
    });
    connection.connect();
    return connection;
}

require('./endpoints/studenti.js')(server, getConnection);
require('./endpoints/facultati.js')(server, getConnection);
require('./endpoints/sectii.js')(server, getConnection);
require('./endpoints/serii.js')(server, getConnection);
require('./endpoints/cursuri.js')(server, getConnection);
require('./endpoints/grupe.js')(server, getConnection);
require('./endpoints/semigrupe.js')(server, getConnection);
require('./endpoints/materii.js')(server, getConnection);
require('./endpoints/seminarii.js')(server, getConnection);
require('./endpoints/laboratoare.js')(server, getConnection);
require('./endpoints/profesori.js')(server, getConnection);

server.listen(8080, function() {
    console.log('listening', server.name, server.url);
});

