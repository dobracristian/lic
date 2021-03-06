console.log('salut');

var restify = require('restify');
//console.log('Modul', restify);
var CookieParser = require('restify-cookies');


var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(CookieParser.parse);

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
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'sigad'
    });
    connection.connect();
    return connection;
}
var auth = require('./auth.js');
console.log('Auth este:',auth);

require('./endpoints/studenti.js')(server, getConnection);
require('./endpoints/ani.js')(server, getConnection);
require('./endpoints/orar.js')(server, getConnection);
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
require('./endpoints/fisiere.js')(server, getConnection);
require('./endpoints/student/curs-lab-sem.js')(server, getConnection);
require('./endpoints/profesor/cursuri.js')(server, getConnection);
require('./endpoints/profesor/laboratoare.js')(server, getConnection);
require('./endpoints/profesor/seminarii.js')(server, getConnection);
require('./endpoints/login.js')(server, getConnection);
require('./endpoints/logout.js')(server, getConnection);
require('./endpoints/whoami.js')(server, getConnection);

server.listen(8080, function() {
    console.log('listening', server.name, server.url);
});

