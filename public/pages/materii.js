angular.module('app').controller('MateriiController', function($scope, Restangular){
    console.log('Salut!');
    Restangular.all('/api/materii').getList().then(function(response) {
        $scope.materii = response.plain();
    });
});