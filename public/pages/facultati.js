angular.module('app').controller('FacultatiController', function($scope, Restangular){
    console.log("Salut!");
    Restangular.all('api/facultati').getList().then(function(response) {
        console.log('Facultati:', response.plain());
        $scope.facultati = response.plain();
    });

});
