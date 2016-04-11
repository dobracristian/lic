angular.module('app').controller('LaboratoareController', function($scope, Restangular){
    console.log('Salut!');
    Restangular.all('api/laboratoare').getList().then(function(response) {
        $scope.laboratoare = response.plain();
    });
});
