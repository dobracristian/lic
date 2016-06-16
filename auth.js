module.exports = {
    login: login,
    logout: logout,
    getUser: getUser
};

var sessions = {};

function login(user, res) {
    var token = 'T' + Math.random();
    sessions[token] = {
        user: user,
        loginDate: new Date(),
        token: token
    };

    res.setCookie('token', token);
}

function logout(req, res) {

    delete sessions[req.cookies.token];
    console.log('Pas1');
    res.clearCookie('token');
    res.send('OK');
}

function getUser(req) {
    var token = req.cookies.token;
    console.log('Pas1');

    console.log('sesiuni curente', sessions);
    console.log('token', req.cookies.token);
    console.log('user', sessions[token] && sessions[token].user);


    return sessions[token] ? sessions[token].user : {};

}