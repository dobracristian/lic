angular.module('app').controller('StudentiController', function($scope, Restangular, $stateParams){
    console.log('Salut!', $stateParams.sem);
    Restangular.all('api/studenti').getList({sem: $stateParams.sem}).then(function(response) {
        $scope.studenti = response.plain();
    });
});