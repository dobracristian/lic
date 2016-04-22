angular.module('app', ['ui.router', 'restangular', 'ui.bootstrap']).config(function($stateProvider){

    $stateProvider.state({
        name: 'admin',
        url: '/admin',
        templateUrl: 'pages/admin/admin.html'
        //controller: 'AdminController'
    });

    $stateProvider.state({
        name: 'admin.facultati',
        url: '/facultati',
        templateUrl: 'pages/admin/facultati.html',
        controller: 'FacultatiController'
    });

    $stateProvider.state({
        name: 'admin.sectii',
        url: '/sectii?f',
        templateUrl: 'pages/admin/sectii.html',
        controller: 'SectiiController'
    });

    $stateProvider.state({
        name: 'admin.serii',
        url: '/serii?f&sc',
        templateUrl: 'pages/admin/serii.html',
        controller: 'SeriiController'
    });

    $stateProvider.state({
        name: 'admin.grupe',
        url: '/grupe?f&sc&ser',
        templateUrl: 'pages/admin/grupe.html',
        controller: 'GrupeController'
    });

    $stateProvider.state({
        name: 'admin.semigrupe',
        url: '/semigrupe?f&sc&ser&gr',
        templateUrl: 'pages/admin/semigrupe.html',
        controller: 'SemigrupeController'
    });

    $stateProvider.state({
        name: 'admin.studenti',
        url: '/studenti?f&sc&ser&gr&sem',
        templateUrl: 'pages/admin/studenti.html',
        controller: 'StudentiController'
    });

    $stateProvider.state({
        name: 'admin.profesori',
        url: '/profesori',
        templateUrl: 'pages/admin/profesori.html',
        controller: 'ProfesoriController'
    });

    $stateProvider.state({
        name: 'admin.materii',
        url: '/materii',
        templateUrl: 'pages/admin/materii.html',
        controller: 'MateriiController'
    });

    $stateProvider.state({
        name: 'admin.cursuri',
        url: '/cursuri?f&sc&ser&mat&prof',
        templateUrl: 'pages/admin/cursuri.html',
        controller: 'CursuriController'
    });

    $stateProvider.state({
        name: 'admin.laboratoare',
        url: '/laboratoare?f&sc&ser&gr&sem&curs&prof',
        templateUrl: 'pages/admin/laboratoare.html',
        controller: 'LaboratoareController'
    });


    $stateProvider.state({
        name: 'admin.seminarii',
        url: '/seminarii?f&sc&ser&gr&curs&prof',
        templateUrl: 'pages/admin/seminarii.html',
        controller: 'SeminariiController'
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        templateUrl: 'pages/login.html',
        controller: 'LoginController'
    });

    $stateProvider.state({
        name: 'student',
        url: '/student',
        templateUrl: 'pages/student.html',
        controller: 'StudentController'
    });

    $stateProvider.state({
        name: 'curs',
        url: '/curs/:id',
        templateUrl: 'pages/curs.html',
        controller: 'CursController'
    });

});
