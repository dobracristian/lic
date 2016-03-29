angular.module('app', ['ui.router', 'restangular']).config(function($stateProvider){
    $stateProvider.state({
        name: 'facultati',
        url: '/facultati',
        templateUrl: 'pages/facultati.html',
        controller: 'FacultatiController'
    });

    $stateProvider.state({
        name: 'sectii',
        url: '/sectii',
        templateUrl: 'pages/sectii.html'
    });

    $stateProvider.state({
        name: 'serii',
        url: '/serii',
        templateUrl: 'pages/serii.html'
    });

    $stateProvider.state({
        name: 'grupe',
        url: '/grupe',
        templateUrl: 'pages/grupe.html'
    });

    $stateProvider.state({
        name: 'semigrupe',
        url: '/semigrupe',
        templateUrl: 'pages/semigrupe.html'
    });

    $stateProvider.state({
        name: 'studenti',
        url: '/studenti',
        templateUrl: 'pages/studenti.html'
    });

    $stateProvider.state({
        name: 'profesori',
        url: '/profesori',
        templateUrl: 'pages/profesori.html'
    });

    $stateProvider.state({
        name: 'materii',
        url: '/materii',
        templateUrl: 'pages/materii.html'
    });

    $stateProvider.state({
        name: 'cursuri',
        url: '/cursuri',
        templateUrl: 'pages/cursuri.html'
    });

    $stateProvider.state({
        name: 'laboratoare',
        url: '/laboratoare',
        templateUrl: 'pages/laboratoare.html'
    });


    $stateProvider.state({
        name: 'seminarii',
        url: '/seminarii',
        templateUrl: 'pages/seminarii.html'
    });

});
