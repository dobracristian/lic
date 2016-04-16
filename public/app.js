angular.module('app', ['ui.router', 'restangular', 'ui.bootstrap']).config(function($stateProvider){
    $stateProvider.state({
        name: 'facultati',
        url: '/facultati',
        templateUrl: 'pages/facultati.html',
        controller: 'FacultatiController'
    });

    $stateProvider.state({
        name: 'sectii',
        url: '/sectii?f',
        templateUrl: 'pages/sectii.html',
        controller: 'SectiiController'
    });

    $stateProvider.state({
        name: 'serii',
        url: '/serii?f&sc',
        templateUrl: 'pages/serii.html',
        controller: 'SeriiController'
    });

    $stateProvider.state({
        name: 'grupe',
        url: '/grupe?f&sc&ser',
        templateUrl: 'pages/grupe.html',
        controller: 'GrupeController'
    });

    $stateProvider.state({
        name: 'semigrupe',
        url: '/semigrupe?f&sc&ser&gr',
        templateUrl: 'pages/semigrupe.html',
        controller: 'SemigrupeController'
    });

    $stateProvider.state({
        name: 'studenti',
        url: '/studenti?f&sc&ser&gr&sem',
        templateUrl: 'pages/studenti.html',
        controller: 'StudentiController'
    });

    $stateProvider.state({
        name: 'profesori',
        url: '/profesori',
        templateUrl: 'pages/profesori.html',
        controller: 'ProfesoriController'
    });

    $stateProvider.state({
        name: 'materii',
        url: '/materii',
        templateUrl: 'pages/materii.html',
        controller: 'MateriiController'
    });

    $stateProvider.state({
        name: 'cursuri',
        url: '/cursuri',
        templateUrl: 'pages/cursuri.html',
        controller: 'CursuriController'
    });

    $stateProvider.state({
        name: 'laboratoare',
        url: '/laboratoare',
        templateUrl: 'pages/laboratoare.html',
        controller: 'LaboratoareController'
    });


    $stateProvider.state({
        name: 'seminarii',
        url: '/seminarii',
        templateUrl: 'pages/seminarii.html',
        controller: 'SeminariiController'
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        templateUrl: 'pages/login.html',
        controller: 'LoginController'
    });

});
