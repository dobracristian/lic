angular.module('app').controller('ProfesoriController', function($scope, Restangular){
    console.log('Salut!');
    Restangular.all('api/profesori').getList().then(function(response) {
        $scope.profesori = response.plain();
    });
});
