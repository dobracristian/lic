angular.module('app').controller('CursController', function ($scope, $stateParams, Restangular) {
    console.log('Salut');

    Restangular.one('/api/cursuri', $stateParams.id).get().then(function(response) {
        $scope.curs = response.plain();
    });

    Restangular.all('/api/fisiere').getList({c: $stateParams.id}).then(function(response) {
        $scope.fisiere = response.plain();
    });

});