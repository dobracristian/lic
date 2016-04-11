angular.module('app').controller('CursuriController', function($scope, Restangular){
    console.log('Salut!');
    Restangular.all('api/cursuri').getList().then(function(response) {
        $scope.cursuri = response.plain();
    });
});
